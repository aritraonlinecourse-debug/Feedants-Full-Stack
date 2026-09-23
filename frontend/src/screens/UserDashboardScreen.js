import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useState } from 'react';

import {
  useUserDashboard,
} from '../hooks/useUserDashboard';

import {
  removeSavedCompetition,
} from '../services/savedCompetitionService';

import {
  updateUserDetails,
} from '../services/userService';

import BottomNavigation from '../components/BottomNavigation/BottomNavigation';

const USER_ID =
  '6ab26e6d7754c947b03a88bc';

export default function UserDashboardScreen({
  onCompetitionPress,
  onAccountPress,
  onHomePress,
  onExplorePress,
}) {
  const {
    dashboard,
    loading,
    error,
    reload,
  } = useUserDashboard(
    USER_ID
  );

  const [
    editing,
    setEditing,
  ] = useState(false);

  const [
    savingDetails,
    setSavingDetails,
  ] = useState(false);

  const [
    name,
    setName,
  ] = useState('');

  const [
    email,
    setEmail,
  ] = useState('');

  const [
    phone,
    setPhone,
  ] = useState('');

  const [
    location,
    setLocation,
  ] = useState('');

  const [
    goodAt,
    setGoodAt,
  ] = useState('');

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>
          Loading dashboard...
        </Text>

        <BottomNavigation
          activeTab="account"
          onHomePress={onHomePress}
          onExplorePress={onExplorePress}
          onCompetitionPress={onCompetitionPress}
          onAccountPress={onAccountPress}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Failed to load dashboard
        </Text>

        <Text style={styles.errorText}>
          {error}
        </Text>

        <BottomNavigation
          activeTab="account"
          onHomePress={onHomePress}
          onExplorePress={onExplorePress}
          onCompetitionPress={onCompetitionPress}
          onAccountPress={onAccountPress}
        />
      </View>
    );
  }

  if (!dashboard) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          No dashboard data available.
        </Text>

        <BottomNavigation
          activeTab="account"
          onHomePress={onHomePress}
          onExplorePress={onExplorePress}
          onCompetitionPress={onCompetitionPress}
          onAccountPress={onAccountPress}
        />
      </View>
    );
  }

  const user =
    dashboard.user;

  const savedCompetitions =
    dashboard.savedCompetitions || [];

  function startEditing() {
    setName(user.name || '');
    setEmail(user.email || '');
    setPhone(user.phone || '');
    setLocation(user.location || '');
    setGoodAt(
      user.goodAt
        ? user.goodAt.join(', ')
        : ''
    );

    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
  }

  async function handleUpdateDetails() {
    if (!name.trim()) {
      Alert.alert(
        'Invalid Details',
        'Name is required.'
      );
      return;
    }

    if (!email.trim()) {
      Alert.alert(
        'Invalid Details',
        'Email is required.'
      );
      return;
    }

    const goodAtArray =
      goodAt
        .split(',')
        .map(
          (item) => item.trim()
        )
        .filter(Boolean);

    try {
      setSavingDetails(true);

      await updateUserDetails(
        USER_ID,
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          location: location.trim(),
          goodAt: goodAtArray,
        }
      );

      await reload();

      setEditing(false);

      Alert.alert(
        'Updated',
        'Your details have been updated successfully.'
      );
    } catch (err) {
      Alert.alert(
        'Update Failed',
        err.message ||
          'Failed to update your details.'
      );
    } finally {
      setSavingDetails(false);
    }
  }

  async function handleRemoveSaved(
    competitionId
  ) {
    try {
      await removeSavedCompetition(
        USER_ID,
        competitionId
      );

      await reload();

      Alert.alert(
        'Removed',
        'Competition removed from saved competitions.'
      );
    } catch (err) {
      Alert.alert(
        'Error',
        err.message ||
          'Failed to remove competition.'
      );
    }
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >
        <Text style={styles.pageTitle}>
          My Dashboard
        </Text>

        <View style={styles.profileCard}>
          {!editing ? (
            <>
              <View style={styles.profileTop}>
                {user.profileImage ? (
                  <Image
                    source={{
                      uri: user.profileImage,
                    }}
                    style={
                      styles.profileImage
                    }
                  />
                ) : (
                  <View
                    style={
                      styles.profilePlaceholder
                    }
                  >
                    <Text
                      style={
                        styles.profileInitial
                      }
                    >
                      {user.name
                        ? user.name
                            .charAt(0)
                            .toUpperCase()
                        : '?'}
                    </Text>
                  </View>
                )}

                <View
                  style={
                    styles.profileNameBox
                  }
                >
                  <Text
                    style={
                      styles.profileName
                    }
                    numberOfLines={2}
                  >
                    {user.name || 'User'}
                  </Text>

                  <Text
                    style={
                      styles.profileLocation
                    }
                  >
                    {user.location ||
                      'Location not provided'}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <ProfileRow
                label="Email"
                value={
                  user.email ||
                  'Not provided'
                }
              />

              <ProfileRow
                label="Phone"
                value={
                  user.phone ||
                  'Not provided'
                }
              />

              <ProfileRow
                label="Location"
                value={
                  user.location ||
                  'Not provided'
                }
              />

              <ProfileRow
                label="Good at"
                value={
                  user.goodAt &&
                  user.goodAt.length > 0
                    ? user.goodAt.join(', ')
                    : 'Not provided'
                }
              />

              <TouchableOpacity
                style={
                  styles.updateButton
                }
                activeOpacity={0.8}
                onPress={
                  startEditing
                }
              >
                <Text
                  style={
                    styles.updateButtonText
                  }
                >
                  Update Details
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View>
              <Text
                style={styles.editTitle}
              >
                Update Details
              </Text>

              <Text
                style={styles.inputLabel}
              >
                Name
              </Text>

              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                autoCapitalize="words"
              />

              <Text
                style={styles.inputLabel}
              >
                Email
              </Text>

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text
                style={styles.inputLabel}
              >
                Phone
              </Text>

              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />

              <Text
                style={styles.inputLabel}
              >
                Location
              </Text>

              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Enter your location"
              />

              <Text
                style={styles.inputLabel}
              >
                Good at
              </Text>

              <TextInput
                style={[
                  styles.input,
                  styles.goodAtInput,
                ]}
                value={goodAt}
                onChangeText={setGoodAt}
                placeholder="Singing, Dancing, Painting"
              />

              <Text
                style={styles.inputHint}
              >
                Separate multiple skills with commas.
              </Text>

              <View
                style={
                  styles.editActions
                }
              >
                <TouchableOpacity
                  style={
                    styles.cancelButton
                  }
                  activeOpacity={0.8}
                  disabled={
                    savingDetails
                  }
                  onPress={
                    cancelEditing
                  }
                >
                  <Text
                    style={
                      styles.cancelButtonText
                    }
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    styles.saveDetailsButton
                  }
                  activeOpacity={0.8}
                  disabled={
                    savingDetails
                  }
                  onPress={
                    handleUpdateDetails
                  }
                >
                  <Text
                    style={
                      styles.saveDetailsButtonText
                    }
                  >
                    {savingDetails
                      ? 'Saving...'
                      : 'Save Details'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Saved Competitions
          </Text>

          <View
            style={
              styles.competitionCount
            }
          >
            <Text
              style={
                styles.competitionCountText
              }
            >
              {savedCompetitions.length}
            </Text>
          </View>
        </View>

        {savedCompetitions.length === 0 ? (
          <View
            style={styles.emptyCard}
          >
            <Text
              style={styles.emptyTitle}
            >
              No saved competitions
            </Text>

            <Text
              style={styles.emptyText}
            >
              Competitions you save will
              appear here.
            </Text>
          </View>
        ) : (
          savedCompetitions.map(
            (competition) => (
              <SavedCompetitionCard
                key={
                  competition._id ||
                  competition.id
                }
                competition={
                  competition
                }
                onPress={() => {
                  const competitionId =
                    competition._id ||
                    competition.id;

                  if (
                    onCompetitionPress &&
                    competitionId
                  ) {
                    onCompetitionPress(
                      competitionId
                    );
                  }
                }}
                onRemove={() => {
                  const competitionId =
                    competition._id ||
                    competition.id;

                  if (competitionId) {
                    handleRemoveSaved(
                      competitionId
                    );
                  }
                }}
              />
            )
          )
        )}
      </ScrollView>

      <BottomNavigation
        activeTab="account"
        onHomePress={onHomePress}
        onExplorePress={onExplorePress}
        onCompetitionPress={
          onCompetitionPress
        }
        onAccountPress={
          onAccountPress
        }
      />
    </View>
  );
}

function ProfileRow({
  label,
  value,
}) {
  return (
    <View style={styles.profileRow}>
      <Text style={styles.profileLabel}>
        {label}
      </Text>

      <Text
        style={styles.profileValue}
        numberOfLines={3}
      >
        {value}
      </Text>
    </View>
  );
}

function SavedCompetitionCard({
  competition,
  onPress,
  onRemove,
}) {
  const currentState =
    getCompetitionState(
      competition
    );

  const stateInfo =
    getStateInfo(currentState);

  return (
    <View style={styles.competitionCard}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View
          style={
            styles.competitionHeader
          }
        >
          <View
            style={
              styles.competitionTitleBox
            }
          >
            <Text
              style={
                styles.competitionTitle
              }
              numberOfLines={2}
            >
              {competition.title}
            </Text>

            <Text
              style={
                styles.competitionCategory
              }
            >
              {competition.category}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  stateInfo.backgroundColor,
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    stateInfo.textColor,
                },
              ]}
            >
              {stateInfo.label}
            </Text>
          </View>
        </View>

        <View
          style={
            styles.competitionDivider
          }
        />

        <View
          style={
            styles.competitionInfoRow
          }
        >
          <InfoItem
            label="Prize Pool"
            value={`₹${competition.prizePool}`}
          />

          <InfoItem
            label="Entry"
            value={
              competition.entryFee === 0
                ? 'Free'
                : `₹${competition.entryFee}`
            }
          />
        </View>

        <View
          style={
            styles.competitionInfoRow
          }
        >
          <InfoItem
            label="Participants"
            value={`${competition.participantCount || 0}/${competition.maxParticipants || 0}`}
          />

          <InfoItem
            label="Result"
            value={formatDate(
              competition.resultDate
            )}
          />
        </View>

        <Text
          style={
            styles.viewCompetition
          }
        >
          View Competition →
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.removeButton}
        activeOpacity={0.8}
        onPress={onRemove}
      >
        <Text
          style={
            styles.removeButtonText
          }
        >
          Remove from Saved
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function getCompetitionState(
  competition
) {
  const now = new Date();

  const registrationStart =
    new Date(
      competition.registrationStart
    );

  const registrationDeadline =
    new Date(
      competition.registrationDeadline
    );

  const submissionStart =
    new Date(
      competition.submissionStart
    );

  const submissionDeadline =
    new Date(
      competition.submissionDeadline
    );

  const resultDate =
    new Date(
      competition.resultDate
    );

  if (now < registrationStart) {
    return 'UPCOMING';
  }

  if (
    now >= registrationStart &&
    now < registrationDeadline
  ) {
    return 'REGISTRATION_OPEN';
  }

  if (
    now >= registrationDeadline &&
    now < submissionStart
  ) {
    return 'REGISTRATION_CLOSED';
  }

  if (
    now >= submissionStart &&
    now < submissionDeadline
  ) {
    return 'SUBMISSION_OPEN';
  }

  if (
    now >= submissionDeadline &&
    now < resultDate
  ) {
    return 'SUBMISSION_CLOSED';
  }

  if (now >= resultDate) {
    return 'RESULT_DECLARED';
  }

  return 'UPCOMING';
}

function getStateInfo(state) {
  switch (state) {
    case 'UPCOMING':
      return {
        label: 'Upcoming',
        backgroundColor: '#EEF2F6',
        textColor: '#566074',
      };

    case 'REGISTRATION_OPEN':
      return {
        label: 'Registration Open',
        backgroundColor: '#E5F5F5',
        textColor: '#078C91',
      };

    case 'REGISTRATION_CLOSED':
      return {
        label: 'Registration Closed',
        backgroundColor: '#FFF3E5',
        textColor: '#B56A00',
      };

    case 'SUBMISSION_OPEN':
      return {
        label: 'Submission Open',
        backgroundColor: '#E8F0FF',
        textColor: '#3565B8',
      };

    case 'SUBMISSION_CLOSED':
      return {
        label: 'Submission Closed',
        backgroundColor: '#F1F1F1',
        textColor: '#666666',
      };

    case 'RESULT_DECLARED':
      return {
        label: 'Result Declared',
        backgroundColor: '#EDE7F6',
        textColor: '#6842A5',
      };

    default:
      return {
        label: 'Upcoming',
        backgroundColor: '#EEF2F6',
        textColor: '#566074',
      };
  }
}

function InfoItem({
  label,
  value,
}) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text
        style={styles.infoValue}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

function formatDate(date) {
  if (!date) {
    return 'Not available';
  }

  const parsed =
    new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return 'Not available';
  }

  return parsed.toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F6FAFA',
  },

  content: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#14264A',
    marginBottom: 18,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E7ECEE',
    marginBottom: 26,
  },

  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },

  profilePlaceholder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#078C91',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileInitial: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },

  profileNameBox: {
    flex: 1,
    marginLeft: 16,
  },

  profileName: {
    fontSize: 21,
    fontWeight: '800',
    color: '#14264A',
  },

  profileLocation: {
    marginTop: 5,
    fontSize: 14,
    color: '#7A8295',
  },

  divider: {
    height: 1,
    backgroundColor: '#E9EDF0',
    marginVertical: 18,
  },

  profileRow: {
    flexDirection: 'row',
    paddingVertical: 9,
  },

  profileLabel: {
    width: 90,
    fontSize: 13,
    fontWeight: '700',
    color: '#7A8295',
  },

  profileValue: {
    flex: 1,
    fontSize: 14,
    color: '#263653',
  },

  updateButton: {
    marginTop: 16,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#078C91',
    alignItems: 'center',
    justifyContent: 'center',
  },

  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  editTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#14264A',
    marginBottom: 18,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#566074',
    marginBottom: 6,
  },

  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#DDE3E7',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#263653',
    marginBottom: 14,
  },

  goodAtInput: {
    height: 60,
    textAlignVertical: 'top',
    paddingTop: 12,
  },

  inputHint: {
    marginTop: -8,
    marginBottom: 16,
    fontSize: 11,
    color: '#8A91A1',
  },

  editActions: {
    flexDirection: 'row',
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8DEE5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonText: {
    color: '#566074',
    fontSize: 14,
    fontWeight: '700',
  },

  saveDetailsButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#078C91',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveDetailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  sectionTitle: {
    flex: 1,
    fontSize: 21,
    fontWeight: '800',
    color: '#14264A',
  },

  competitionCount: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  competitionCountText: {
    color: '#078C91',
    fontSize: 13,
    fontWeight: '800',
  },

  competitionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E7ECEE',
  },

  competitionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  competitionTitleBox: {
    flex: 1,
    paddingRight: 10,
  },

  competitionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#14264A',
  },

  competitionCategory: {
    marginTop: 5,
    fontSize: 13,
    color: '#7A8295',
  },

  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 6,
    maxWidth: 125,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },

  competitionDivider: {
    height: 1,
    backgroundColor: '#E9EDF0',
    marginVertical: 14,
  },

  competitionInfoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  infoItem: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 11,
    color: '#8A91A1',
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#263653',
  },

  viewCompetition: {
    marginTop: 2,
    color: '#078C91',
    fontSize: 13,
    fontWeight: '800',
  },

  removeButton: {
    marginTop: 14,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8DEE5',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  removeButtonText: {
    color: '#C04444',
    fontSize: 13,
    fontWeight: '700',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7ECEE',
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#14264A',
    marginBottom: 6,
  },

  emptyText: {
    color: '#7A8295',
    fontSize: 13,
    textAlign: 'center',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F6FAFA',
  },

  loadingText: {
    color: '#555555',
    fontSize: 15,
  },

  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#14264A',
    marginBottom: 8,
  },

  errorText: {
    color: '#777777',
    textAlign: 'center',
  },
});