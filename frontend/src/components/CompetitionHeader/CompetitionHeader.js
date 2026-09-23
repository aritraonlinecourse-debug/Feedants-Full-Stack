

import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CompetitionHeader({
  title = 'Competition',
  category = '',
  tags = [],
  prizePool = 0,
  entryFee = 0,
  remainingSpots = 0,
  maxParticipants = 0,
  participantCount = 0,
  registration,
  currentState,
}) {
  const isRegistered =
    registration?.status === 'REGISTERED' &&
    currentState === 'REGISTRATION_OPEN';

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {isRegistered ? (
          <View style={styles.registered}>
            <Ionicons
              name="checkmark-circle"
              size={18}
              color="#078C91"
            />
            <Text style={styles.registeredText}>Registered</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.metaRow}>
        {category ? (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        ) : null}

        {tags.map((tag, index) => (
          <View key={`${tag}-${index}`} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Prize Pool</Text>
          <Text style={styles.infoValue}>₹{prizePool}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Entry Fee</Text>
          <Text style={styles.infoValue}>₹{entryFee}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Spots Left</Text>
          <Text style={styles.infoValue}>
            {remainingSpots}/{maxParticipants}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width:
                  maxParticipants > 0
                    ? `${Math.min(
                        (participantCount / maxParticipants) * 100,
                        100
                      )}%`
                    : '0%',
              },
            ]}
          />
        </View>

        <Text style={styles.participantText}>
          {participantCount} participants registered
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titleWrapper: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    fontSize: 23,
    fontWeight: '700',
    color: '#171A21',
  },

  registered: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E8F7F6',
  },

  registeredText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '700',
    color: '#078C91',
  },

  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },

  categoryBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#EEF2F6',
    marginRight: 6,
    marginBottom: 5,
  },

  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#566074',
  },

  tag: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#E8F7F6',
    marginRight: 6,
    marginBottom: 5,
  },

  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#078C91',
  },

  infoRow: {
    flexDirection: 'row',
    marginTop: 18,
  },

  infoItem: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 11,
    color: '#8C93AA',
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171A21',
  },

  progressContainer: {
    marginTop: 16,
  },

  progressBackground: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E8EBEF',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#078C91',
    borderRadius: 3,
  },

  participantText: {
    marginTop: 6,
    fontSize: 11,
    color: '#8C93AA',
  },
});