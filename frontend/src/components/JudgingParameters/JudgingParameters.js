import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function JudgingParameters({
  parameters = [],
}) {
  if (!parameters.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Judging Parameters
      </Text>

      {parameters.map((parameter, index) => (
        <View
          key={`${parameter}-${index}`}
          style={styles.row}
        >
          <Text style={styles.number}>
            {index + 1}
          </Text>

          <Text style={styles.text}>
            {parameter}
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

  number: {
    width: 28,
    fontWeight: '700',
    color: '#168B86',
  },

  text: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: '#555555',
  },
});