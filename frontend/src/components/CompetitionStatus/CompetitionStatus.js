import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function CompetitionStatus({
  currentState,
  registration,
}) {
  const isRegistered =
    registration?.status ===
    'REGISTERED';

  if (
    currentState !==
      'REGISTRATION_OPEN' &&
    !isRegistered
  ) {
    return null;
  }

  if (!isRegistered) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Ionicons
        name="checkmark-circle"
        size={20}
        color="#078C91"
      />

      <Text style={styles.text}>
        Registered
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF8F7',
    borderWidth: 1,
    borderColor: '#B9E5E2',
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  text: {
    color: '#078C91',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 6,
  },
});