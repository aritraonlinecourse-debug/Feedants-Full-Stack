import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BottomNavigation({
  activeTab = 'competitions',
  onHomePress,
  onExplorePress,
  onCompetitionPress,
  onAccountPress,
}) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isSmallScreen = width < 390;

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingBottom:
            Platform.OS === 'ios'
              ? Math.max(insets.bottom, 8)
              : 8,
        },
      ]}
    >
      <View style={styles.container}>
        <NavItem
          icon="home-outline"
          label="Home"
          active={activeTab === 'home'}
          small={isSmallScreen}
          onPress={onHomePress}
        />

        <NavItem
          icon="search-outline"
          label="Explore"
          active={activeTab === 'explore'}
          small={isSmallScreen}
          onPress={onExplorePress}
        />

        <View style={styles.centerWrapper}>
          <View style={styles.centerButton}>
            <Ionicons
              name="add"
              size={25}
              color="#FFFFFF"
            />
          </View>
        </View>

        <NavItem
          icon="trophy-outline"
          label="Competitions"
          active={activeTab === 'competitions'}
          small={isSmallScreen}
          onPress={onCompetitionPress}
        />

        <NavItem
          icon="person-outline"
          label="Account"
          active={activeTab === 'account'}
          small={isSmallScreen}
          onPress={onAccountPress}
        />
      </View>
    </View>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  small = false,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={small ? 20 : 22}
        color={active ? '#078C91' : '#8C93AA'}
      />

      <Text
        style={[
          styles.label,
          small && styles.smallLabel,
          active && styles.activeLabel,
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8EBEF',
    zIndex: 1000,
    elevation: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
  },

  item: {
    flex: 1,
    minWidth: 0,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },

  label: {
    marginTop: 3,
    color: '#8C93AA',
    fontSize: 9,
    fontWeight: '500',
    textAlign: 'center',
  },

  smallLabel: {
    fontSize: 8,
  },

  activeLabel: {
    color: '#078C91',
    fontWeight: '700',
  },

  centerWrapper: {
    flex: 1,
    minWidth: 0,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#078C91',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
});