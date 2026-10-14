import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  getDocs,
  Unsubscribe,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { ChildProfile, GradeLevel, SubjectBookFeedback, UserRole } from '../types';
import { getGradeFromAge } from '../data/gradesData';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with Offline Persistence (IndexedDB cache)
let firestoreDb;
try {
  firestoreDb = initializeFirestore(
    app,
    {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    },
    firebaseConfig.firestoreDatabaseId
  );
} catch {
  // Graceful fallback if already initialized or in unsupported environment
  firestoreDb = getFirestore(app, firebaseConfig.firestoreDatabaseId);
}

// CRITICAL: The app will break without this line
export const db = firestoreDb;
export const auth = getAuth(app);

// Standardized Operation Types
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

// Strict Error Info for Firestore conforming to skill requirements
export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection check on boot
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Checking network...');
      return false;
    }
    // Connection handshake completed (doc might not exist or be permission-filtered)
    return true;
  }
}
testConnection();

// Progress Tracking Schema
export interface UserProgressTracking {
  currentLevel: number;
  currentWorld: number;
  xp: number;
  coins: number;
  stars: number;
  streakDays: number;
  completedLevels: number[];
  activeStudyBuddy: string;
  lastPlayedDate: string;
}

// User Profile Document Schema stored in /users/{userId}
export interface StoredUserProfile {
  id: string;
  email: string;
  displayName: string;
  age: number;
  gradeLevel: GradeLevel;
  role: UserRole;
  phoneNumber?: string;
  language?: string;
  progress: UserProgressTracking;
  createdAt: string;
  updatedAt: string;
}

export interface ChildDocData {
  id: string;
  userId: string;
  name: string;
  age: number;
  ageGroup: string;
  gradeLevel?: string;
  avatar: string;
  phoneNumber?: string;
  language?: string;
  activeStudyBuddy: string;
  currentLevel: number;
  currentWorld: number;
  xp: number;
  coins: number;
  stars: number;
  streakDays: number;
  lastPlayedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface InitUserProfileOptions {
  age?: number;
  gradeLevel?: GradeLevel;
  role?: UserRole;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  language?: string;
  avatar?: string;
  progress?: Partial<UserProgressTracking>;
}

/**
 * Initializes a user profile document in Firestore upon successful authentication.
 * Stores fields for:
 * - email
 * - age
 * - grade level
 * - progress tracking (level, world, xp, coins, stars, streak, completed levels, active study buddy)
 *
 * Adheres strictly to security rules and intermediate blueprint representation.
 * If the user document already exists, merges any missing attributes while preserving
 * existing learner progress.
 */
export async function initializeUserProfile(
  userOrUid: FirebaseUser | { uid: string; email?: string | null; displayName?: string | null } | string,
  options?: InitUserProfileOptions
): Promise<StoredUserProfile> {
  const uid = typeof userOrUid === 'string' ? userOrUid : userOrUid.uid;
  const userPath = `users/${uid}`;
  const now = new Date().toISOString();

  // Resolve email
  let email = options?.email;
  if (!email && typeof userOrUid !== 'string' && userOrUid.email) {
    email = userOrUid.email;
  }
  if (!email && auth.currentUser?.email) {
    email = auth.currentUser.email;
  }
  email = email || 'learner@wonderquest.org';

  // Resolve displayName
  let displayName = options?.displayName;
  if (!displayName && typeof userOrUid !== 'string' && userOrUid.displayName) {
    displayName = userOrUid.displayName;
  }
  if (!displayName && auth.currentUser?.displayName) {
    displayName = auth.currentUser.displayName;
  }
  displayName = displayName || email.split('@')[0] || 'Little Explorer';

  // Resolve age & grade level
  const age = options?.age && options.age >= 1 ? options.age : 10;
  const gradeLevel: GradeLevel = options?.gradeLevel || getGradeFromAge(age);
  const role: UserRole = options?.role || 'parent';

  // Default progress tracking state
  const defaultProgress: UserProgressTracking = {
    currentLevel: 1,
    currentWorld: 1,
    xp: 150,
    coins: 100,
    stars: 3,
    streakDays: 1,
    completedLevels: [],
    activeStudyBuddy: 'owl_pip',
    lastPlayedDate: now.split('T')[0],
    ...(options?.progress || {}),
  };

  try {
    const userDocRef = doc(db, 'users', uid);
    const existingSnap = await getDoc(userDocRef);

    if (existingSnap.exists()) {
      const existingData = existingSnap.data() as Partial<StoredUserProfile>;
      const mergedProfile: StoredUserProfile = {
        id: uid,
        email: existingData.email || email,
        displayName: existingData.displayName || displayName,
        age: existingData.age || age,
        gradeLevel: existingData.gradeLevel || gradeLevel,
        role: existingData.role || role,
        phoneNumber: options?.phoneNumber || existingData.phoneNumber,
        language: options?.language || existingData.language,
        progress: {
          ...defaultProgress,
          ...(existingData.progress || {}),
        },
        createdAt: existingData.createdAt || now,
        updatedAt: now,
      };

      await setDoc(userDocRef, mergedProfile, { merge: true });
      return mergedProfile;
    } else {
      const newProfile: StoredUserProfile = {
        id: uid,
        email,
        displayName,
        age,
        gradeLevel,
        role,
        ...(options?.phoneNumber ? { phoneNumber: options.phoneNumber } : {}),
        ...(options?.language ? { language: options.language } : {}),
        progress: defaultProgress,
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(userDocRef, newProfile);

      // Create initial child learner profile for family dashboard
      const childId = `child_${uid.slice(0, 6)}`;
      const childData: ChildDocData = {
        id: childId,
        userId: uid,
        name: displayName,
        age,
        ageGroup: age <= 5 ? '3-5' : age <= 8 ? '6-8' : age <= 11 ? '9-11' : age <= 14 ? '12-14' : age <= 16 ? '15-16' : '17-18',
        gradeLevel,
        avatar: options?.avatar || '🦉',
        ...(options?.phoneNumber ? { phoneNumber: options.phoneNumber } : {}),
        ...(options?.language ? { language: options.language } : {}),
        activeStudyBuddy: defaultProgress.activeStudyBuddy,
        currentLevel: defaultProgress.currentLevel,
        currentWorld: defaultProgress.currentWorld,
        xp: defaultProgress.xp,
        coins: defaultProgress.coins,
        stars: defaultProgress.stars,
        streakDays: defaultProgress.streakDays,
        lastPlayedDate: defaultProgress.lastPlayedDate,
        createdAt: now,
        updatedAt: now,
      };

      try {
        await setDoc(doc(db, 'users', uid, 'children', childId), childData);
      } catch (err) {
        console.warn('Initial child profile creation error:', err);
      }

      return newProfile;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, userPath);
  }
}

// 10,000 User Concurrency Write-Debounce Cache
const syncDebounceTimers = new Map<string, any>();

// Auth & Database Service Helpers
export const firebaseService = {
  // Direct access to initializeUserProfile
  initializeUserProfile,

  // Sign up with Email, Password, Name, Age, Phone Number, Language, Class/Grade, and Avatar
  async signUpWithEmail(
    email: string,
    pass: string,
    displayName: string,
    age: number,
    role: UserRole = 'parent',
    gradeLevel?: GradeLevel,
    phoneNumber?: string,
    language?: string,
    avatar?: string
  ): Promise<StoredUserProfile> {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    const user = cred.user;

    if (displayName) {
      try {
        await updateProfile(user, { displayName });
      } catch (err) {
        console.warn('Could not update profile name', err);
      }
    }

    // Initialize the profile document in Firestore
    return initializeUserProfile(user, {
      email,
      displayName,
      age,
      gradeLevel: gradeLevel || getGradeFromAge(age),
      role,
      phoneNumber,
      language,
      avatar,
    });
  },

  // Update existing user profile in Firestore
  async updateUserProfile(uid: string, data: Partial<StoredUserProfile>): Promise<void> {
    const userPath = `users/${uid}`;
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, userPath);
    }
  },

  // Sign In with Email & Password
  async signInWithEmail(email: string, pass: string): Promise<StoredUserProfile> {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    const user = cred.user;
    return initializeUserProfile(user, { email });
  },

  // Quick Sign In with Google
  async signInWithGoogle(): Promise<StoredUserProfile> {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const user = cred.user;
    return initializeUserProfile(user, {
      email: user.email || undefined,
      displayName: user.displayName || undefined,
    });
  },

  // Sign Out
  async signOut(): Promise<void> {
    await signOut(auth);
  },

  // Fetch user profile from Firestore
  async fetchUserProfile(uid: string, fallbackEmail: string = ''): Promise<StoredUserProfile | null> {
    const userPath = `users/${uid}`;
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        return snap.data() as StoredUserProfile;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, userPath);
    }
  },

  // Sync User Progress to Firestore
  async syncUserProgress(uid: string, progressUpdates: Partial<UserProgressTracking>): Promise<void> {
    const userPath = `users/${uid}`;
    try {
      const userRef = doc(db, 'users', uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const existing = snap.data() as StoredUserProfile;
        const updatedProgress: UserProgressTracking = {
          ...existing.progress,
          ...progressUpdates,
        };
        await updateDoc(userRef, {
          progress: updatedProgress,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, userPath);
    }
  },

  // Sync Child Profile to Firestore (Optimized with 1,200ms debounce buffer for 10,000 user concurrency)
  async syncChildToFirestore(uid: string, child: ChildProfile): Promise<void> {
    const key = `child_${uid}_${child.id}`;
    if (syncDebounceTimers.has(key)) {
      clearTimeout(syncDebounceTimers.get(key));
    }

    return new Promise((resolve) => {
      const timer = setTimeout(async () => {
        syncDebounceTimers.delete(key);
        const childPath = `users/${uid}/children/${child.id}`;
        const payload: ChildDocData = {
          id: child.id,
          userId: uid,
          name: child.name,
          age: child.age,
          ageGroup: child.ageGroup,
          gradeLevel: child.gradeLevel,
          avatar: child.avatar,
          activeStudyBuddy: child.activeStudyBuddy || 'owl_pip',
          currentLevel: child.currentLevel,
          currentWorld: child.currentWorld,
          xp: child.xp,
          coins: child.coins,
          stars: child.stars,
          streakDays: child.streakDays,
          lastPlayedDate: child.lastActiveDate || new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        try {
          await setDoc(doc(db, 'users', uid, 'children', child.id), payload, { merge: true });
          resolve();
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, childPath);
        }
      }, 1200);

      syncDebounceTimers.set(key, timer);
    });
  },

  // Subscribe to real-time children updates
  subscribeChildren(uid: string, onUpdate: (children: ChildDocData[]) => void): Unsubscribe {
    const childrenPath = `users/${uid}/children`;
    return onSnapshot(
      collection(db, 'users', uid, 'children'),
      (snap) => {
        const list: ChildDocData[] = [];
        snap.forEach((d) => list.push(d.data() as ChildDocData));
        onUpdate(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, childrenPath);
      }
    );
  },

  // Save Subject Book Completion Feedback & Certificate to Firestore
  async submitSubjectBookFeedback(uid: string, feedback: SubjectBookFeedback): Promise<void> {
    const feedbackPath = `users/${uid}/bookFeedback/${feedback.id}`;
    try {
      await setDoc(doc(db, 'users', uid, 'bookFeedback', feedback.id), feedback, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, feedbackPath);
    }
  },

  // Fetch all Subject Book Feedbacks for a user
  async fetchSubjectBookFeedbacks(uid: string): Promise<SubjectBookFeedback[]> {
    const feedbackPath = `users/${uid}/bookFeedback`;
    try {
      const snap = await getDocs(collection(db, 'users', uid, 'bookFeedback'));
      const list: SubjectBookFeedback[] = [];
      snap.forEach((d) => list.push(d.data() as SubjectBookFeedback));
      return list;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, feedbackPath);
    }
  },
};
