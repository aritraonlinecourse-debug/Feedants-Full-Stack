import {
  useEffect,
  useState,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

function getTimeRemaining(deadline) {
  const difference =
    new Date(deadline).getTime() -
    Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(
      difference /
        (1000 * 60 * 60 * 24)
    ),

    hours: Math.floor(
      (difference /
        (1000 * 60 * 60)) %
        24
    ),

    minutes: Math.floor(
      (difference /
        (1000 * 60)) %
        60
    ),

    seconds: Math.floor(
      (difference / 1000) %
        60
    ),
  };
}

export default function CountdownCard({
  deadline,
  title = 'Registration closes in',
}) {
  const { width } =
    useWindowDimensions();

  const isSmallScreen =
    width < 500;

  const [
    remaining,
    setRemaining,
  ] = useState(
    getTimeRemaining(deadline)
  );

  useEffect(() => {
    if (!deadline) {
      return undefined;
    }

    const update = () => {
      setRemaining(
        getTimeRemaining(deadline)
      );
    };

    update();

    const timer = setInterval(
      update,
      1000
    );

    return () =>
      clearInterval(timer);
  }, [deadline]);

  if (!deadline) {
    return null;
  }

  const days = String(
    remaining.days
  ).padStart(2, '0');

  const hours = String(
    remaining.hours
  ).padStart(2, '0');

  const minutes = String(
    remaining.minutes
  ).padStart(2, '0');

  const seconds = String(
    remaining.seconds
  ).padStart(2, '0');

  if (isSmallScreen) {
    return (
      <View style={styles.mobileContainer}>
        <View style={styles.mobileHeader}>
          <View style={styles.titleSection}>
            <Ionicons
              name="hourglass-outline"
              size={21}
              color="#078C91"
            />

            <Text
              style={styles.mobileTitle}
              numberOfLines={2}
            >
              {title}
            </Text>
          </View>

          <View style={styles.hurrySection}>
            <Ionicons
              name="timer-outline"
              size={19}
              color="#078C91"
            />

            <Text style={styles.mobileHurry}>
              Hurry up!
            </Text>
          </View>
        </View>

        <View style={styles.mobileCountdownBox}>
          <Text
            style={styles.mobileCountdown}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
            numberOfLines={1}
          >
            {days}d : {hours}h : {minutes}m : {seconds}s
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.side}>
        <Ionicons
          name="hourglass-outline"
          size={24}
          color="#078C91"
        />

        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      <View style={styles.countdownWrapper}>
        <Text
          style={styles.countdown}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.75}
        >
          {days}d : {hours}h : {minutes}m : {seconds}s
        </Text>
      </View>

      <View style={styles.sideRight}>
        <Ionicons
          name="timer-outline"
          size={24}
          color="#078C91"
        />

        <Text style={styles.hurry}>
          Hurry up!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 58,
    backgroundColor: '#EAF7F7',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  side: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    flex: 1,
    marginLeft: 8,
    color: '#14264A',
    fontSize: 13,
    fontWeight: '700',
  },

  countdownWrapper: {
    flexShrink: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  countdown: {
    color: '#078C91',
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'center',
  },

  sideRight: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  hurry: {
    marginLeft: 7,
    color: '#078C91',
    fontSize: 12,
    fontWeight: '700',
  },

  mobileContainer: {
    backgroundColor: '#EAF7F7',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },

  mobileHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  titleSection: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },

  mobileTitle: {
    flex: 1,
    marginLeft: 8,
    color: '#14264A',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },

  hurrySection: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  mobileHurry: {
    marginLeft: 5,
    color: '#078C91',
    fontSize: 11,
    fontWeight: '700',
  },

  mobileCountdownBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    paddingVertical: 9,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mobileCountdown: {
    color: '#078C91',
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'center',
  },
});