import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function CompetitionRules({
  rules = [],
}) {
  if (!rules.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Rules
      </Text>

      {rules.map((rule, index) => (
        <View
          key={`${rule}-${index}`}
          style={styles.row}
        >
          <Text style={styles.bullet}>
            •
          </Text>

          <Text style={styles.text}>
            {rule}
          </Text>
        </View>
      ))}
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
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  bullet: {
    width: 22,
    fontSize: 18,
    color: '#168B86',
  },

  text: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: '#555555',
  },
});