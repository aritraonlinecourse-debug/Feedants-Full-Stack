import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function Rewards({
  rewards = [],
}) {
  if (!rewards.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Rewards
        </Text>

        <Text style={styles.all}>
          (All Positions)
        </Text>
      </View>

      {rewards.map(
        (reward, index) => (
          <View
            key={`${reward.position}-${index}`}
            style={styles.row}
          >
            <View style={styles.position}>
              <Ionicons
                name={
                  index < 3
                    ? 'medal-outline'
                    : 'star-outline'
                }
                size={23}
                color={
                  index < 3
                    ? '#E99A12'
                    : '#078C91'
                }
              />

              <Text style={styles.positionText}>
                {reward.position}
              </Text>
            </View>

            <Text style={styles.amount}>
              ₹ {reward.amount}
            </Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEF1F4',
    padding: 16,
    marginBottom: 12,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  title: {
    color: '#14264A',
    fontSize: 15,
    fontWeight: '700',
  },

  all: {
    color: '#71809F',
    fontSize: 12,
    marginLeft: 8,
  },

  row: {
    minHeight: 39,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F4',
  },

  position: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  positionText: {
    marginLeft: 11,
    color: '#14264A',
    fontSize: 14,
    fontWeight: '600',
  },

  amount: {
    color: '#078C91',
    fontSize: 16,
    fontWeight: '700',
  },
});