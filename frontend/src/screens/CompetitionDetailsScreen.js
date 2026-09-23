

import { useState } from 'react';

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import CompetitionHeader from '../components/CompetitionHeader/CompetitionHeader';
import JudgeCard from '../components/JudgeCard/JudgeCard';
import CountdownCard from '../components/CountdownCard/CountdownCard';
import ImportantDates from '../components/ImportantDates/ImportantDates';
import PreviousWinners from '../components/PreviousWinners/PreviousWinners';
import CompetitionTabs from '../components/CompetitionTabs/CompetitionTabs';
import Rewards from '../components/Rewards/Rewards';
import Disclaimer from '../components/Disclaimer/Disclaimer';
import PrizeInfo from '../components/PrizeInfo/PrizeInfo';
import ReferralCard from '../components/ReferralCard/ReferralCard';
import UserReviews from '../components/UserReviews/UserReviews';
import AdPlaceholder from '../components/AdPlaceholder/AdPlaceholder';
import SubmissionButton from '../components/SubmissionButton/SubmissionButton';
import LanguageToggle from '../components/LanguageToggle/LanguageToggle';
import BottomNavigation from '../components/BottomNavigation/BottomNavigation';

import { useCompetition } from '../hooks/useCompetition';
import { useRegistration } from '../hooks/useRegistration';
import { useSubmission } from '../hooks/useSubmission';
import { useSavedCompetition } from '../hooks/useSavedCompetition';

const DEFAULT_COMPETITION_ID =
  '6ab26a3d5842c3f2a32a8f54';

const USER_ID =
  '6ab26e6d7754c947b03a88bc';

export default function CompetitionDetailsScreen({
  competitionId = DEFAULT_COMPETITION_ID,
  onAccountPress,
  onHomePress,
  onExplorePress,
}) {
  const normalizedCompetitionId =
    typeof competitionId === 'string'
      ? competitionId
      : competitionId?._id ||
        competitionId?.id ||
        DEFAULT_COMPETITION_ID;

  const {
    competition,
    loading: competitionLoading,
    error: competitionError,
    reload: reloadCompetition,
  } = useCompetition(normalizedCompetitionId);

  const {
    registration,
    loading: registrationLoading,
    actionLoading: registrationActionLoading,
    error: registrationError,
    register,
    cancel,
  } = useRegistration(
    normalizedCompetitionId,
    USER_ID
  );

  const {
    submission,
    loading: submissionLoading,
    actionLoading: submissionActionLoading,
    error: submissionError,
    submit,
  } = useSubmission(
    normalizedCompetitionId,
    USER_ID
  );

  const {
    saved,
    loading: savedLoading,
    actionLoading: savedActionLoading,
    error: savedError,
    toggle: toggleSaved,
  } = useSavedCompetition(
    USER_ID,
    normalizedCompetitionId
  );

  const [submissionUrl, setSubmissionUrl] =
    useState('');

  const [
    showSubmissionForm,
    setShowSubmissionForm,
  ] = useState(false);

  async function handleRegister() {
    try {
      await register();

      await reloadCompetition();

      Alert.alert(
        'Registration Successful',
        'You are now registered for this competition.'
      );
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error.message
      );
    }
  }

  async function handleCancel() {
    try {
      await cancel();

      await reloadCompetition();

      Alert.alert(
        'Registration Cancelled',
        'Your registration has been cancelled.'
      );
    } catch (error) {
      Alert.alert(
        'Cancellation Failed',
        error.message
      );
    }
  }

  async function handleSubmit() {
    try {
      await submit(submissionUrl);

      await reloadCompetition();

      setSubmissionUrl('');
      setShowSubmissionForm(false);

      Alert.alert(
        'Submission Successful',
        'Your entry has been submitted successfully.'
      );
    } catch (error) {
      Alert.alert(
        'Submission Failed',
        error.message
      );
    }
  }

  async function handleToggleSaved() {
    try {
      await toggleSaved();

      Alert.alert(
        saved
          ? 'Removed from Saved'
          : 'Competition Saved',
        saved
          ? 'Competition removed from your saved list.'
          : 'Competition added to your saved list.'
      );
    } catch (error) {
      Alert.alert(
        'Save Failed',
        error.message
      );
    }
  }

  const loading =
    competitionLoading ||
    registrationLoading ||
    submissionLoading ||
    savedLoading;

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>
          Loading competition...
        </Text>
      </View>
    );
  }

  if (competitionError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Failed to load competition
        </Text>

        <Text style={styles.errorText}>
          {competitionError}
        </Text>
      </View>
    );
  }

  if (!competition) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Competition not found
        </Text>
      </View>
    );
  }

  const actionError =
    registrationError ||
    submissionError ||
    savedError;

  const actionLoading =
    registrationActionLoading ||
    submissionActionLoading;

  const showRegistrationCountdown =
    competition.currentState === 'UPCOMING' ||
    competition.currentState === 'REGISTRATION_OPEN';

  const showSubmissionCountdown =
    competition.currentState === 'SUBMISSION_OPEN';

  let countdownDeadline = null;
  let countdownTitle = '';

  if (competition.currentState === 'UPCOMING') {
    countdownDeadline =
      competition.registrationStart;

    countdownTitle =
      'Registration starts in';
  } else if (
    competition.currentState ===
    'REGISTRATION_OPEN'
  ) {
    countdownDeadline =
      competition.registrationDeadline;

    countdownTitle =
      'Registration closes in';
  } else if (
    competition.currentState ===
    'SUBMISSION_OPEN'
  ) {
    countdownDeadline =
      competition.submissionDeadline;

    countdownTitle =
      'Submission closes in';
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backWrapper}
            activeOpacity={0.7}
            onPress={onExplorePress}
          >
            <Text style={styles.backIcon}>
              ‹
            </Text>

            <Text style={styles.backText}>
              Go back
            </Text>
          </TouchableOpacity>

          <LanguageToggle />
        </View>

        <CompetitionHeader
          title={competition.title}
          category={competition.category}
          tags={competition.tags}
          prizePool={competition.prizePool}
          entryFee={competition.entryFee}
          remainingSpots={competition.remainingSpots}
          maxParticipants={
            competition.maxParticipants
          }
          participantCount={
            competition.participantCount
          }
          registration={registration}
          currentState={competition.currentState}
        />

        <TouchableOpacity
          style={[
            styles.saveButton,
            saved && styles.savedButton,
          ]}
          activeOpacity={0.8}
          disabled={savedActionLoading}
          onPress={handleToggleSaved}
        >
          <Ionicons
            name={
              saved
                ? 'bookmark'
                : 'bookmark-outline'
            }
            size={19}
            color={
              saved
                ? '#FFFFFF'
                : '#078C91'
            }
          />

          <Text
            style={[
              styles.saveButtonText,
              saved &&
                styles.savedButtonText,
            ]}
          >
            {savedActionLoading
              ? 'Saving...'
              : saved
                ? 'Saved'
                : 'Save Competition'}
          </Text>
        </TouchableOpacity>

        <JudgeCard
          judge={competition.judge}
        />

        {showRegistrationCountdown ||
        showSubmissionCountdown ? (
          <CountdownCard
            deadline={countdownDeadline}
            title={countdownTitle}
          />
        ) : null}

        <ImportantDates
          registrationStart={
            competition.registrationStart
          }
          registrationDeadline={
            competition.registrationDeadline
          }
          submissionStart={
            competition.submissionStart
          }
          submissionDeadline={
            competition.submissionDeadline
          }
          resultDate={competition.resultDate}
        />

        <PreviousWinners
          winners={competition.previousWinners}
        />

        <CompetitionTabs
          description={competition.description}
          judgingParameters={
            competition.judgingParameters
          }
          rules={competition.rules}
          eligibility={competition.eligibility}
        />

        <Rewards
          rewards={competition.rewards}
        />

        <Disclaimer />

        <PrizeInfo />

        <ReferralCard />

        <UserReviews />

        <AdPlaceholder />

        {actionError ? (
          <View style={styles.errorBox}>
            <Text style={styles.actionError}>
              {actionError}
            </Text>
          </View>
        ) : null}

        <SubmissionButton
          currentState={
            competition.currentState
          }
          registration={registration}
          submission={submission}
          actionLoading={actionLoading}
          submissionUrl={submissionUrl}
          setSubmissionUrl={
            setSubmissionUrl
          }
          showForm={showSubmissionForm}
          setShowForm={
            setShowSubmissionForm
          }
          onRegister={handleRegister}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </ScrollView>

      <BottomNavigation
        activeTab="competitions"
        onHomePress={onHomePress}
        onExplorePress={onExplorePress}
        onAccountPress={onAccountPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F6FAFA',
  },

  container: {
    flex: 1,
  },

  content: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 120,
  },

  topBar: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  backWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 34,
    lineHeight: 36,
    color: '#14264A',
    marginRight: 8,
  },

  backText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#14264A',
  },

  saveButton: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#078C91',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  savedButton: {
    backgroundColor: '#078C91',
  },

  saveButtonText: {
    marginLeft: 8,
    color: '#078C91',
    fontSize: 14,
    fontWeight: '800',
  },

  savedButtonText: {
    color: '#FFFFFF',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F6FAFA',
  },

  loadingText: {
    color: '#555555',
    fontSize: 15,
  },

  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#14264A',
    marginBottom: 8,
  },

  errorText: {
    color: '#777777',
    textAlign: 'center',
  },

  errorBox: {
    backgroundColor: '#FFF2F1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  actionError: {
    color: '#C0392B',
    fontSize: 13,
    textAlign: 'center',
  },
});