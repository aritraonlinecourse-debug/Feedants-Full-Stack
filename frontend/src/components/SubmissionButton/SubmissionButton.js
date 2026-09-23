import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

export default function SubmissionButton({
  currentState,
  registration,
  submission,
  actionLoading,
  submissionUrl,
  setSubmissionUrl,
  showForm,
  setShowForm,
  onRegister,
  onCancel,
  onSubmit,
}) {
  const isRegistered =
    registration?.status === 'REGISTERED';

  const isSubmitted =
    submission?.status === 'SUBMITTED' ||
    submission?.status === 'UNDER_REVIEW' ||
    submission?.status === 'JUDGED';

  if (
    currentState === 'UPCOMING'
  ) {
    return (
      <StatusMessage>
        Registration Not Open
      </StatusMessage>
    );
  }

  if (
    currentState === 'REGISTRATION_OPEN'
  ) {
    if (isRegistered) {
      return (
        <View style={styles.registeredArea}>
          <View style={styles.registeredButton}>
            <Ionicons
              name="checkmark-circle"
              size={21}
              color="#FFFFFF"
            />

            <Text style={styles.registeredTitle}>
              Registered
            </Text>
          </View>

          <Pressable
            style={styles.cancelButton}
            onPress={onCancel}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.cancelText}>
                Cancel Registration
              </Text>
            )}
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Pressable
          style={styles.primaryButton}
          onPress={onRegister}
          disabled={actionLoading}
        >
          {actionLoading ? (
            <ActivityIndicator
              color="#FFFFFF"
            />
          ) : (
            <>
              <Text style={styles.primaryTitle}>
                Register Now
              </Text>

              <Text style={styles.primarySubtitle}>
                Join this competition
              </Text>
            </>
          )}
        </Pressable>
      </View>
    );
  }

  if (
    currentState === 'REGISTRATION_CLOSED'
  ) {
    return (
      <StatusMessage>
        Registration Closed
      </StatusMessage>
    );
  }

  if (
    currentState === 'SUBMISSION_OPEN'
  ) {
    if (!isRegistered) {
      return (
        <StatusMessage>
          You are not registered
        </StatusMessage>
      );
    }

    if (isSubmitted) {
      return (
        <View style={styles.submitted}>
          <Ionicons
            name="checkmark-circle"
            size={23}
            color="#FFFFFF"
          />

          <View style={styles.submittedText}>
            <Text style={styles.submittedTitle}>
              Submission Uploaded
            </Text>

            <Text style={styles.submittedStatus}>
              Status: {submission.status}
            </Text>
          </View>
        </View>
      );
    }

    if (!showForm) {
      return (
        <View style={styles.container}>
          <Pressable
            style={styles.primaryButton}
            onPress={() =>
              setShowForm(true)
            }
          >
            <Text style={styles.primaryTitle}>
              Upload Submission
            </Text>

            <Text style={styles.primarySubtitle}>
              Registered
            </Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>
          Upload Submission
        </Text>

        <Text style={styles.label}>
          Submission URL
        </Text>

        <TextInput
          style={styles.input}
          value={submissionUrl}
          onChangeText={
            setSubmissionUrl
          }
          placeholder="https://example.com/your-entry"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          editable={!actionLoading}
        />

        <View style={styles.formActions}>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => {
              setShowForm(false);
              setSubmissionUrl('');
            }}
            disabled={actionLoading}
          >
            <Text style={styles.secondaryText}>
              Cancel
            </Text>
          </Pressable>

          <Pressable
            style={styles.primarySmallButton}
            onPress={onSubmit}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <ActivityIndicator
                color="#FFFFFF"
              />
            ) : (
              <Text style={styles.primarySmallText}>
                Submit
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    );
  }

  if (
    currentState === 'SUBMISSION_CLOSED'
  ) {
    return (
      <StatusMessage>
        Submission Closed
      </StatusMessage>
    );
  }

  if (
    currentState === 'RESULT_DECLARED'
  ) {
    return (
      <StatusMessage>
        Results Declared
      </StatusMessage>
    );
  }

  return (
    <StatusMessage>
      Registration Not Open
    </StatusMessage>
  );
}

function StatusMessage({
  children,
}) {
  return (
    <View style={styles.status}>
      <Text style={styles.statusText}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  primaryButton: {
    minHeight: 58,
    backgroundColor: '#078C91',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  primarySubtitle: {
    color: '#FFFFFF',
    fontSize: 11,
    marginTop: 3,
  },

  registeredArea: {
    marginBottom: 10,
  },

  registeredButton: {
    minHeight: 58,
    backgroundColor: '#078C91',
    borderRadius: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  registeredTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 7,
  },

  cancelButton: {
    marginTop: 8,
    minHeight: 42,
    borderWidth: 1,
    borderColor: '#D9534F',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: '#D9534F',
    fontSize: 13,
    fontWeight: '600',
  },

  submitted: {
    minHeight: 58,
    backgroundColor: '#078C91',
    borderRadius: 11,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  submittedText: {
    marginLeft: 8,
  },

  submittedTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  submittedStatus: {
    color: '#D8F4F2',
    fontSize: 11,
    marginTop: 3,
  },

  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E7EBEF',
    padding: 16,
    marginBottom: 10,
  },

  formTitle: {
    color: '#14264A',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 15,
  },

  label: {
    color: '#14264A',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 7,
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: '#D6DCE4',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#14264A',
  },

  formActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },

  secondaryButton: {
    flex: 1,
    minHeight: 45,
    borderWidth: 1,
    borderColor: '#14264A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryText: {
    color: '#14264A',
    fontSize: 13,
    fontWeight: '600',
  },

  primarySmallButton: {
    flex: 1,
    minHeight: 45,
    backgroundColor: '#078C91',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primarySmallText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  status: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  statusText: {
    color: '#71809F',
    fontSize: 14,
    fontWeight: '600',
  },
});