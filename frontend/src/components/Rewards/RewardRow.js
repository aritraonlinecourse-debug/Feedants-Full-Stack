import { StyleSheet, Text, View } from 'react-native';

export default function RewardRow({ position, amount }) {
  return (
    <View style={styles.row}>
      <Text style={styles.position}>{position}</Text>
      <Text style={styles.amount}>₹{amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF2',
  },
  position: {
    color: '#14264A',
    fontSize: 15,
  },
  amount: {
    color: '#087F87',
    fontSize: 15,
    fontWeight: '700',
  },
});