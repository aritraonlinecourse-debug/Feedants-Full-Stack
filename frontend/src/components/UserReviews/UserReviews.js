import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function UserReviews() {
  return (
    <Pressable style={styles.container}>
      <View style={styles.icon}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={23}
          color="#14264A"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Hear From Our Users
        </Text>

        <Text style={styles.subtitle}>
          See what participants say about Feedants
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color="#14264A"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 67,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EEF1F4',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  icon: {
    width: 36,
    alignItems: 'center',
  },

  content: {
    flex: 1,
    marginLeft: 6,
  },

  title: {
    color: '#14264A',
    fontSize: 13,
    fontWeight: '700',
  },

  subtitle: {
    color: '#71809F',
    fontSize: 10,
    marginTop: 4,
  },
});