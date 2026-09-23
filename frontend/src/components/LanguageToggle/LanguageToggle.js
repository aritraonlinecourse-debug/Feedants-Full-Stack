import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function LanguageToggle() {
  return (
    <View style={styles.container}>
      <View style={styles.active}>
        <Text style={styles.activeText}>
          ENG
        </Text>
      </View>

      <View style={styles.inactive}>
        <Text style={styles.inactiveText}>
          हिंदी
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#F1F3F6',
    padding: 2,
  },

  active: {
    backgroundColor: '#078C91',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

  activeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  inactive: {
    paddingHorizontal: 13,
    paddingVertical: 8,
  },

  inactiveText: {
    color: '#14264A',
    fontSize: 12,
    fontWeight: '600',
  },
});