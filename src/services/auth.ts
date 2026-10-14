import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as fbSignOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
  NextOrObserver,
  Unsubscribe,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType, StoredUserProfile, UserProgressTracking, ChildDocData } from './firebase';
import { GradeLevel, UserRole } from '../types';
import { getGradeFromAge } from '../data/gradesData';

export interface SignUpOptions {
  displayName?: string;
  age: number;
  gradeLevel?: GradeLevel;
  role?: UserRole;
  initialProgress?: Partial<UserProgressTracking>;
}

export interface CreateUserProfileData {
  displayName?: string;
  age: number;
  gradeLevel?: GradeLevel;
  role?: UserRole;
  progress?: Partial<UserProgressTracking>;
}

/**
 * Creates or updates the user profile document in Firestore at /users/{userId}.
 * Stores fields for:
 * - email
 * - age
 * - gradeLevel
 * - progress tracking
 * - role
 * - displayName
 * - timestamps
 */
export async function createUserProfileDocument(
  user: FirebaseUser,
  profileData: CreateUserProfileData
): Promise<StoredUserProfile> {
  const uid = user.uid;
  const userPath = `users/${uid}`;
  const now = new Date().toISOString();

  const email = user.email || 'learner@wonderquest.org';
  const displayName = profileData.displayName || user.displayName || email.split('@')[0] || 'Little Explorer';
  const age = Math.max(1, Math.min(120, profileData.age || 10));
  const gradeLevel = profileData.gradeLevel || getGradeFromAge(age);
  const role: UserRole = profileData.role || 'student';

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
    ...(profileData.progress || {}),
  };

  const userDocRef = doc(db, 'users', uid);

  try {
    const existingSnap = await getDoc(userDocRef);

    if (existingSnap.exists()) {
      const existing = existingSnap.data() as Partial<StoredUserProfile>;
      const merged: StoredUserProfile = {
        id: uid,
        email: existing.email || email,
        displayName: existing.displayName || displayName,
        age: existing.age || age,
        gradeLevel: existing.gradeLevel || gradeLevel,
        role: existing.role || role,
        progress: {
          ...defaultProgress,
          ...(existing.progress || {}),
        },
        createdAt: existing.createdAt || now,
        updatedAt: now,
      };

      await setDoc(userDocRef, merged, { merge: true });
      return merged;
    } else {
      const newProfile: StoredUserProfile = {
        id: uid,
        email,
        displayName,
        age,
        gradeLevel,
        role,
        progress: defaultProgress,
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(userDocRef, newProfile);

      // Create matching child profile in /users/{userId}/children/{childId}
      const childId = `child_${uid.slice(0, 6)}`;
      const childData: ChildDocData = {
        id: childId,
        userId: uid,
        name: displayName,
        age,
        ageGroup: age <= 5 ? '3-5' : age <= 8 ? '6-8' : age <= 11 ? '9-11' : age <= 14 ? '12-14' : age <= 16 ? '15-16' : '17-18',
        gradeLevel,
        avatar: '🦉',
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

      const childPath = `users/${uid}/children/${childId}`;
      try {
        await setDoc(doc(db, 'users', uid, 'children', childId), childData);
      } catch (childError) {
        console.warn('Initial child profile creation error:', childError);
      }

      return newProfile;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, userPath);
  }
}

/**
 * Registers a new user with email and password, updates Auth profile,
 * and creates the Firestore user profile document with email, age, grade level, and progress.
 */
export async function signUpWithEmail(
  email: string,
  pass: string,
  options: SignUpOptions
): Promise<StoredUserProfile> {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  const user = cred.user;

  if (options.displayName) {
    try {
      await updateProfile(user, { displayName: options.displayName });
    } catch (err) {
      console.warn('Could not update Auth displayName:', err);
    }
  }

  // Create Firestore user document upon registration
  return createUserProfileDocument(user, {
    displayName: options.displayName,
    age: options.age,
    gradeLevel: options.gradeLevel,
    role: options.role,
    progress: options.initialProgress,
  });
}

/**
 * Authenticates user with email and password and loads/initializes their Firestore document.
 */
export async function signInWithEmail(email: string, pass: string): Promise<StoredUserProfile> {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  const user = cred.user;

  // Ensure Firestore document exists and is up to date
  return createUserProfileDocument(user, {
    displayName: user.displayName || email.split('@')[0],
    age: 10,
  });
}

/**
 * Signs in with Google popup and initializes/loads the user profile document in Firestore.
 */
export async function signInWithGoogle(): Promise<StoredUserProfile> {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  const user = cred.user;

  return createUserProfileDocument(user, {
    displayName: user.displayName || 'Google Explorer',
    age: 10,
  });
}

/**
 * Signs out the currently authenticated user from Firebase Auth.
 */
export async function signOutUser(): Promise<void> {
  await fbSignOut(auth);
}

/**
 * Retrieves the user profile document from Firestore for a given UID.
 */
export async function getUserProfile(uid: string): Promise<StoredUserProfile | null> {
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
}

/**
 * Subscribes to Firebase Auth state changes.
 */
export function onAuthStateChange(observer: NextOrObserver<FirebaseUser>): Unsubscribe {
  return onAuthStateChanged(auth, observer);
}

export const authService = {
  signUp: signUpWithEmail,
  signUpWithEmail,
  signIn: signInWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOut: signOutUser,
  createUserProfileDocument,
  getUserProfile,
  onAuthStateChange,
};

export default authService;
