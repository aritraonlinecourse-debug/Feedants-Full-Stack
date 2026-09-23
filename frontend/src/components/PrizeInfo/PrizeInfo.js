import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function PrizeInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.videoCard}>
        <View style={styles.videoIcon}>
          <Ionicons
            name="play"
            size={20}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.videoText}>
          <Text style={styles.heading}>
            How will you receive
          </Text>

          <Text style={styles.heading}>
            prize money?
          </Text>

          <Text style={styles.subText}>
            Watch video to know more
          </Text>
        </View>
      </View>

      <View style={styles.paymentCard}>
        <View style={styles.paymentRow}>
          <Ionicons
            name="shield-checkmark-outline"
            size={22}
            color="#14264A"
          />

          <Text style={styles.paymentText}>
            Refund policy
          </Text>
        </View>

        <View style={styles.paymentRow}>
          <Ionicons
            name="shield-checkmark-outline"
            size={22}
            color="#14264A"
          />

          <Text style={styles.paymentText}>
            Secure payments powered by
          </Text>

          <Text style={styles.razorpay}>
            Razorpay
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },

  videoCard: {
    flex: 1,
    minHeight: 92,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EEF1F4',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  videoIcon: {
    width: 47,
    height: 47,
    borderRadius: 12,
    backgroundColor: '#B9E8D9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  videoText: {
    flex: 1,
    marginLeft: 10,
  },

  heading: {
    color: '#14264A',
    fontSize: 12,
    fontWeight: '700',
  },

  subText: {
    color: '#71809F',
    fontSize: 10,
    marginTop: 5,
  },

  paymentCard: {
    flex: 1.35,
    minHeight: 92,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EEF1F4',
    padding: 12,
    justifyContent: 'center',
  },

  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    flexWrap: 'wrap',
  },

  paymentText: {
    color: '#14264A',
    fontSize: 11,
    marginLeft: 8,
  },

  razorpay: {
    color: '#1769E0',
    fontSize: 12,
    fontWeight: '700',
    fontStyle: 'italic',
    marginLeft: 5,
  },
});