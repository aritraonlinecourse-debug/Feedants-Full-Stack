

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function PreviousWinners({
  winners = [],
}) {
  if (!winners.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Previous Winners
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        nestedScrollEnabled
        directionalLockEnabled
      >
        {winners.map(
          (winner, index) => (
            <View
              key={`${winner.name}-${index}`}
              style={styles.card}
            >
              <View style={styles.imageWrapper}>
                {winner.image ? (
                  <Image
                    source={{
                      uri: winner.image,
                    }}
                    style={styles.image}
                  />
                ) : (
                  <View
                    style={styles.imageFallback}
                  >
                    <Ionicons
                      name="person"
                      size={28}
                      color="#FFFFFF"
                    />
                  </View>
                )}

                <View style={styles.play}>
                  <Ionicons
                    name="play"
                    size={12}
                    color="#078C91"
                  />
                </View>
              </View>

              <View style={styles.info}>
                <Text
                  style={styles.name}
                  numberOfLines={1}
                >
                  {winner.name}
                </Text>

                <Text style={styles.position}>
                  {winner.position}
                </Text>
              </View>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEF1F4',
    paddingVertical: 14,
    marginBottom: 12,
  },

  title: {
    color: '#14264A',
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 11,
  },

  scroll: {
    paddingHorizontal: 16,
    paddingRight: 16,
  },

  card: {
    width: 175,
    height: 92,
    backgroundColor: '#F8F9FB',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    marginRight: 10,
  },

  imageWrapper: {
    width: 72,
    height: 78,
    position: 'relative',
  },

  image: {
    width: 72,
    height: 78,
    borderRadius: 9,
  },

  imageFallback: {
    width: 72,
    height: 78,
    borderRadius: 9,
    backgroundColor: '#8BA6A5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  play: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  info: {
    flex: 1,
    marginLeft: 9,
  },

  name: {
    color: '#14264A',
    fontSize: 12,
    fontWeight: '700',
  },

  position: {
    color: '#078C91',
    fontSize: 11,
    marginTop: 4,
  },
});