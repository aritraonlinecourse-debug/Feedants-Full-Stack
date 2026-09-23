import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function Disclaimer() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="information-circle-outline"
        size={21}
        color="#078C91"
      />

      <Text style={styles.text}>
        Disclaimer: Only contributions from paid
        participants will be considered for judging.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAF7F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  text: {
    flex: 1,
    marginLeft: 8,
    color: '#14264A',
    fontSize: 11,
    lineHeight: 16,
  },
});