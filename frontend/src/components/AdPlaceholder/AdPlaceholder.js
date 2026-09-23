import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function AdPlaceholder() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="megaphone-outline"
        size={19}
        color="#7C86A3"
      />

      <Text style={styles.text}>
        Ad Here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 43,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CBD2DF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },

  text: {
    color: '#7C86A3',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 7,
  },
});