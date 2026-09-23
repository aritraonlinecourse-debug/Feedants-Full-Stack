import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function CompetitionDescription({
  description,
}) {
  if (!description) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        About the Competition
      </Text>

      <Text style={styles.description}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#14264A',
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555555',
  },
});