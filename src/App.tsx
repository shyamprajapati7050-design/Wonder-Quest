import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { GlobalLanguageProvider } from './context/GlobalLanguageContext';
import { Navbar } from './components/Navbar';
import { ParentPinModal } from './components/ParentPinModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DailyStreakModal } from './components/DailyStreakModal';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { WelcomeOnboarding } from './screens/WelcomeOnboarding';
import { ChildProfileSelect } from './screens/ChildProfileSelect';
import { AgeSelectionScreen } from './screens/AgeSelectionScreen';
import { HomeDashboard } from './screens/HomeDashboard';
import { ReadAndLearnScreen } from './screens/ReadAndLearnScreen';
import { SubjectsScreen } from './screens/SubjectsScreen';
import { LevelMapScreen } from './screens/LevelMapScreen';
import { LevelDetailsModal } from './screens/LevelDetailsModal';
import { QuestionScreen } from './screens/QuestionScreen';
import { LevelResultScreen } from './screens/LevelResultScreen';
import { RewardsShopScreen } from './screens/RewardsShopScreen';
import { AchievementsScreen } from './screens/AchievementsScreen';
import { MasterTestScreen } from './screens/MasterTestScreen';
import { MasterTestResultScreen } from './screens/MasterTestResultScreen';
import { ProgressDashboardScreen } from './screens/ProgressDashboardScreen';
import { ParentDashboardScreen } from './screens/ParentDashboardScreen';
import { AdminPanelScreen } from './screens/AdminPanelScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { LoginScreen } from './screens/LoginScreen';
import { ChapterQuizzesScreen } from './screens/ChapterQuizzesScreen';

const MainRouter: React.FC = () => {
  const { currentScreen, isStreakModalOpen, setIsStreakModalOpen } = useGame();

  // Primary Login / Registration Screen
  if (currentScreen === 'login' || currentScreen === 'parent_auth') {
    return <LoginScreen />;
  }

  // Full-screen modes without standard header
  if (currentScreen === 'splash') {
    return <SplashScreen />;
  }

  if (currentScreen === 'welcome') {
    return <WelcomeOnboarding />;
  }

  if (currentScreen === 'age_select') {
    return <AgeSelectionScreen />;
  }

  if (currentScreen === 'child_profile_select') {
    return <ChildProfileSelect />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-8 pb-24 md:pb-8">
        {currentScreen === 'home_dashboard' && <HomeDashboard />}
        {currentScreen === 'chapter_quizzes' && <ChapterQuizzesScreen />}
        {currentScreen === 'read_and_learn' && <ReadAndLearnScreen />}
        {currentScreen === 'subjects' && <SubjectsScreen />}
        {currentScreen === 'level_map' && <LevelMapScreen />}
        {currentScreen === 'level_details' && (
          <>
            <LevelMapScreen />
            <LevelDetailsModal />
          </>
        )}
        {currentScreen === 'question_screen' && <QuestionScreen />}
        {currentScreen === 'level_result' && <LevelResultScreen />}
        {currentScreen === 'rewards' && <RewardsShopScreen />}
        {currentScreen === 'achievements' && <AchievementsScreen />}
        {currentScreen === 'master_test' && <MasterTestScreen />}
        {currentScreen === 'master_test_result' && <MasterTestResultScreen />}
        {currentScreen === 'progress_dashboard' && <ProgressDashboardScreen />}
        {currentScreen === 'parent_dashboard' && <ParentDashboardScreen />}
        {currentScreen === 'admin_panel' && <AdminPanelScreen />}
        {(currentScreen === 'settings' || currentScreen === 'help_support') && (
          <SettingsScreen />
        )}
      </main>

      {/* Docked Mobile Bottom Navigation for Phones (iPhone & Android) */}
      <MobileBottomNav />

      {/* Persistent Parent PIN Verification Modal */}
      <ParentPinModal />

      {/* Daily Login Streak Flame Modal */}
      <DailyStreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
      />

      {/* Online & Offline Connectivity Monitor & Toast */}
      <OfflineIndicator />

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200/80 bg-white/80 py-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>WonderQuest © 2026 · Safe & Adaptive Educational Gaming for Students (Nursery to 12th Class · Ages 3–18)</span>
          <div className="flex items-center gap-4">
            <span>25-Question Levels</span>
            <span>·</span>
            <span>15-Question Master Tests</span>
            <span>·</span>
            <span>Parent Oversight</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <GlobalLanguageProvider>
      <GameProvider>
        <MainRouter />
      </GameProvider>
    </GlobalLanguageProvider>
  );
}
