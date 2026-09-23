

import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function ReferralCard() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="megaphone-outline"
          size={30}
          color="#FFFFFF"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Refer & Earn more discount
        </Text>

        <View style={styles.linkRow}>
          <TextInput
            defaultValue="https://feedants.com/r/referral123"
            editable={true}
            style={styles.input}
            placeholder="Enter referral link"
            placeholderTextColor="#9AA3B2"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Pressable
            style={styles.copyButton}
          >
            <Text style={styles.copyText}>
              Copy Link
            </Text>
          </Pressable>
        </View>

        <Text style={styles.earn}>
          You earn ₹10 for every signup
        </Text>
      </View>

      <View style={styles.action}>
        <Pressable
          style={styles.referButton}
        >
          <Text style={styles.referText}>
            Refer Now
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E2F8EA',
    borderRadius: 13,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  iconContainer: {
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    minWidth: 0,
    marginLeft: 8,
  },

  title: {
    color: '#14264A',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 7,
  },

  linkRow: {
    flexDirection: 'row',
    minWidth: 0,
  },

  input: {
    flex: 1,
    minWidth: 0,
    height: 36,
    borderWidth: 1,
    borderColor: '#BBDDD0',
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    paddingHorizontal: 9,
    fontSize: 10,
    color: '#5B6A82',
  },

  copyButton: {
    height: 36,
    marginLeft: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#078C91',
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  copyText: {
    color: '#078C91',
    fontSize: 10,
    fontWeight: '700',
  },

  earn: {
    color: '#078C91',
    fontSize: 10,
    marginTop: 5,
  },

  action: {
    width: 115,
    marginLeft: 9,
  },

  referButton: {
    backgroundColor: '#078C91',
    borderRadius: 7,
    minHeight: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },

  referText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});