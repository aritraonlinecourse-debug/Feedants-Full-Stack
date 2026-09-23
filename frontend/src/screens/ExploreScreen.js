

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import BottomNavigation from '../components/BottomNavigation/BottomNavigation';
import { useCompetitions } from '../hooks/useCompetitions';

export default function ExploreScreen({
  onHomePress,
  onExplorePress,
  onCompetitionPress,
  onAccountPress,
}) {
  const {
    competitions,
    loading,
    error,
  } = useCompetitions();

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.pageTitle}>
          Explore Competitions
        </Text>

        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#8C93AA"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search competitions"
            placeholderTextColor="#8C93AA"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Competitions
          </Text>

          <Text style={styles.competitionCount}>
            {competitions.length}
          </Text>
        </View>

        {loading ? (
          <View style={styles.stateBox}>
            <Text style={styles.stateText}>
              Loading competitions...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.stateBox}>
            <Text style={styles.errorTitle}>
              Failed to load competitions
            </Text>

            <Text style={styles.stateText}>
              {error}
            </Text>
          </View>
        ) : competitions.length === 0 ? (
          <View style={styles.stateBox}>
            <Text style={styles.errorTitle}>
              No competitions available
            </Text>

            <Text style={styles.stateText}>
              Check back later for available competitions.
            </Text>
          </View>
        ) : (
          competitions.map((competition) => (
            <CompetitionCard
              key={competition._id}
              competition={competition}
              onPress={() =>
                onCompetitionPress(
                  competition._id
                )
              }
            />
          ))
        )}
      </ScrollView>

      <BottomNavigation
        activeTab="explore"
        onHomePress={onHomePress}
        onExplorePress={onExplorePress}
        onCompetitionPress={onCompetitionPress}
        onAccountPress={onAccountPress}
      />
    </View>
  );
}

function CompetitionCard({
  competition,
  onPress,
}) {
  const currentState =
    competition.currentState ||
    competition.status;

  const statusLabel =
    getStatusLabel(currentState);

  const statusStyle =
    getStatusStyle(currentState);

  const prizePool =
    Number(competition.prizePool || 0);

  const entryFee =
    Number(competition.entryFee || 0);

  const participantCount =
    Number(
      competition.participantCount || 0
    );

  const maxParticipants =
    Number(
      competition.maxParticipants || 0
    );

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.cardTop}>
        <View style={styles.titleBox}>
          <Text
            style={styles.cardTitle}
            numberOfLines={2}
          >
            {competition.title}
          </Text>

          <Text style={styles.category}>
            {competition.category}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            statusStyle.background,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              statusStyle.text,
            ]}
          >
            {statusLabel}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <InfoItem
          label="Prize Pool"
          value={`₹${prizePool}`}
        />

        <InfoItem
          label="Entry"
          value={
            entryFee === 0
              ? 'Free'
              : `₹${entryFee}`
          }
        />
      </View>

      <View style={styles.infoRow}>
        <InfoItem
          label="Participants"
          value={`${participantCount}/${maxParticipants}`}
        />

        <InfoItem
          label="Spots Left"
          value={`${Math.max(
            maxParticipants -
              participantCount,
            0
          )}`}
        />
      </View>

      <Text style={styles.viewText}>
        View Competition →
      </Text>
    </TouchableOpacity>
  );
}

function InfoItem({
  label,
  value,
}) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

function getStatusLabel(state) {
  switch (state) {
    case 'UPCOMING':
      return 'Upcoming';

    case 'REGISTRATION_OPEN':
      return 'Registration Open';

    case 'REGISTRATION_CLOSED':
      return 'Registration Closed';

    case 'SUBMISSION_OPEN':
      return 'Submission Open';

    case 'SUBMISSION_CLOSED':
      return 'Submission Closed';

    case 'RESULT_DECLARED':
      return 'Result Declared';

    default:
      return 'Unavailable';
  }
}

function getStatusStyle(state) {
  switch (state) {
    case 'REGISTRATION_OPEN':
      return {
        background: styles.openBadge,
        text: styles.openText,
      };

    case 'SUBMISSION_OPEN':
      return {
        background: styles.openBadge,
        text: styles.openText,
      };

    case 'UPCOMING':
      return {
        background: styles.upcomingBadge,
        text: styles.upcomingText,
      };

    case 'RESULT_DECLARED':
      return {
        background: styles.resultBadge,
        text: styles.resultText,
      };

    default:
      return {
        background: styles.closedBadge,
        text: styles.closedText,
      };
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F6FAFA',
  },

  content: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 110,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#14264A',
    marginBottom: 18,
  },

  searchBox: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDE3E7',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 24,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#263653',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  sectionTitle: {
    flex: 1,
    fontSize: 21,
    fontWeight: '800',
    color: '#14264A',
  },

  competitionCount: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5F5F5',
    color: '#078C91',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    paddingTop: 6,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E7ECEE',
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  titleBox: {
    flex: 1,
    paddingRight: 10,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#14264A',
  },

  category: {
    marginTop: 5,
    fontSize: 13,
    color: '#7A8295',
  },

  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 6,
    maxWidth: 130,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },

  openBadge: {
    backgroundColor: '#E5F5F5',
  },

  openText: {
    color: '#078C91',
  },

  upcomingBadge: {
    backgroundColor: '#EEF3FF',
  },

  upcomingText: {
    color: '#4967A5',
  },

  closedBadge: {
    backgroundColor: '#F1F2F4',
  },

  closedText: {
    color: '#777E8E',
  },

  resultBadge: {
    backgroundColor: '#FFF3E5',
  },

  resultText: {
    color: '#B76A00',
  },

  divider: {
    height: 1,
    backgroundColor: '#E9EDF0',
    marginVertical: 14,
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  infoItem: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 11,
    color: '#8A91A1',
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#263653',
  },

  viewText: {
    marginTop: 2,
    color: '#078C91',
    fontSize: 13,
    fontWeight: '800',
  },

  stateBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7ECEE',
    padding: 24,
    alignItems: 'center',
  },

  errorTitle: {
    color: '#14264A',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },

  stateText: {
    color: '#7A8295',
    fontSize: 13,
    textAlign: 'center',
  },
});