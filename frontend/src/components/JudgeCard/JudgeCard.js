import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function JudgeCard({
  judge,
}) {
  if (!judge) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.person}>
        {judge.image ? (
          <Image
            source={{
              uri: judge.image,
            }}
            style={styles.image}
          />
        ) : (
          <View style={styles.imageFallback}>
            <Ionicons
              name="person"
              size={34}
              color="#FFFFFF"
            />
          </View>
        )}

        <View style={styles.details}>
          <Text style={styles.label}>
            Judge
          </Text>

          <Text style={styles.name}>
            {judge.name}
          </Text>

          <Text style={styles.profession}>
            {judge.profession}
          </Text>

          <Text style={styles.experience}>
            {judge.experience}
          </Text>
        </View>
      </View>

      <View style={styles.video}>
        <View style={styles.play}>
          <Ionicons
            name="play"
            size={23}
            color="#078C91"
          />
        </View>

        <Text style={styles.videoText}>
          Intro Video
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEF1F4',
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  person: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  image: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },

  imageFallback: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: '#8FB8B6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  details: {
    marginLeft: 14,
    flex: 1,
  },

  label: {
    color: '#71809F',
    fontSize: 12,
    marginBottom: 4,
  },

  name: {
    color: '#14264A',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 5,
  },

  profession: {
    color: '#71809F',
    fontSize: 12,
    marginBottom: 3,
  },

  experience: {
    color: '#71809F',
    fontSize: 12,
  },

  video: {
    width: 85,
    alignItems: 'center',
  },

  play: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#E8F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  videoText: {
    marginTop: 7,
    color: '#71809F',
    fontSize: 12,
  },
});