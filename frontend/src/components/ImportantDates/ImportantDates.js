import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

function formatDate(value) {
  if (!value) {
    return {
      date: 'Not available',
      time: '',
    };
  }

  const date = new Date(value);

  return {
    date: date.toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      }
    ),
    time: date.toLocaleTimeString(
      'en-IN',
      {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }
    ),
  };
}

export default function ImportantDates({
  registrationDeadline,
  submissionStart,
  submissionDeadline,
  resultDate,
}) {
  const { width } = useWindowDimensions();

  const isSmallScreen = width < 390;

  const items = [
    {
      label: 'Register Before',
      value: registrationDeadline,
      icon: 'calendar-outline',
    },
    {
      label: 'Submission Starts',
      value: submissionStart,
      icon: 'paper-plane-outline',
    },
    {
      label: 'Submission Ends',
      value: submissionDeadline,
      icon: 'cloud-upload-outline',
    },
    {
      label: 'Result Date',
      value: resultDate,
      icon: 'trophy-outline',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Important Dates
      </Text>

      <View style={styles.grid}>
        {items.map((item, index) => {
          const formatted = formatDate(item.value);

          return (
            <View
              key={item.label}
              style={[
                styles.item,
                index % 2 === 0 && styles.rightBorder,
                index < 2 && styles.bottomBorder,
              ]}
            >
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={item.icon}
                  size={isSmallScreen ? 19 : 21}
                  color="#078C91"
                />
              </View>

              <View style={styles.details}>
                <Text
                  style={[
                    styles.label,
                    isSmallScreen && styles.smallLabel,
                  ]}
                  numberOfLines={2}
                >
                  {item.label}
                </Text>

                <Text
                  style={[
                    styles.date,
                    isSmallScreen && styles.smallDate,
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  {formatted.date}
                </Text>

                {formatted.time ? (
                  <Text
                    style={[
                      styles.time,
                      isSmallScreen && styles.smallTime,
                    ]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}
                  >
                    {formatted.time}
                  </Text>
                ) : null}
              </View>
            </View>
          );
        })}
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
    marginBottom: 12,
    overflow: 'hidden',
  },

  heading: {
    fontSize: 17,
    fontWeight: '700',
    color: '#14264A',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  item: {
    width: '50%',
    minHeight: 86,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightBorder: {
    borderRightWidth: 1,
    borderRightColor: '#EEF1F4',
  },

  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F4',
  },

  iconWrapper: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  details: {
    flex: 1,
    minWidth: 0,
  },

  label: {
    color: '#71809F',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },

  smallLabel: {
    fontSize: 11,
  },

  date: {
    color: '#14264A',
    fontSize: 14,
    fontWeight: '700',
  },

  smallDate: {
    fontSize: 13,
  },

  time: {
    color: '#71809F',
    fontSize: 11,
    marginTop: 2,
  },

  smallTime: {
    fontSize: 10,
  },
});