

import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CompetitionDetailsScreen from './src/screens/CompetitionDetailsScreen';
import UserDashboardScreen from './src/screens/UserDashboardScreen';
import ExploreScreen from './src/screens/ExploreScreen';

const DEFAULT_COMPETITION_ID =
  '6ab26a3d5842c3f2a32a8f54';

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState('competition');

  const [selectedCompetitionId, setSelectedCompetitionId] =
    useState(DEFAULT_COMPETITION_ID);

  function openHome() {
    setCurrentScreen('home');
  }

  function openExplore() {
    setCurrentScreen('explore');
  }

  function openDashboard() {
    setCurrentScreen('dashboard');
  }

  function openCompetition(competitionId) {
    if (competitionId) {
      setSelectedCompetitionId(competitionId);
    }

    setCurrentScreen('competition');
  }

  return (
    <SafeAreaProvider>
      {currentScreen === 'dashboard' ? (
        <UserDashboardScreen
          onHomePress={openHome}
          onExplorePress={openExplore}
          onCompetitionPress={openCompetition}
          onAccountPress={openDashboard}
        />
      ) : currentScreen === 'explore' ? (
        <ExploreScreen
          onHomePress={openHome}
          onExplorePress={openExplore}
          onCompetitionPress={openCompetition}
          onAccountPress={openDashboard}
        />
      ) : (
        <CompetitionDetailsScreen
          competitionId={selectedCompetitionId}
          onHomePress={openHome}
          onExplorePress={openExplore}
          onAccountPress={openDashboard}
        />
      )}
    </SafeAreaProvider>
  );
}