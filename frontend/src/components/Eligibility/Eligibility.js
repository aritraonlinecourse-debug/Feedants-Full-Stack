import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Eligibility({
  eligibility = [],
}) {
  if (!eligibility.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Eligibility
      </Text>

      {eligibility.map((item, index) => (
        <View
          key={`${item}-${index}`}
          style={styles.row}
        >
          <Text style={styles.bullet}>
            •
          </Text>

          <Text style={styles.text}>
            {item}
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