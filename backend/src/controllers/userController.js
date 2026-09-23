// backend/src/controllers/userController.js

const User = require('../models/User');
const Registration = require('../models/Registration');

const {
  updateUserDetails,
  saveCompetition,
  removeSavedCompetition,
  isCompetitionSaved,
} = require('../services/userService');

const {
  getCompetitionState,
} = require('../utils/competitionState');

async function getUserDashboard(
  req,
  res
) {
  try {
    const { userId } =
      req.params;

    const user =
      await User.findById(userId)
        .select(
          'name email phone location profileImage goodAt savedCompetitions'
        )
        .populate({
          path: 'savedCompetitions',
          select:
            'title category tags prizePool entryFee maxParticipants participantCount registrationStart registrationDeadline submissionStart submissionDeadline resultDate status',
        });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const registrations =
      await Registration.find({
        user: userId,
        status: 'REGISTERED',
      })
        .populate({
          path: 'competition',
          select:
            'title category tags prizePool entryFee maxParticipants participantCount registrationStart registrationDeadline submissionStart submissionDeadline resultDate status',
        })
        .sort({
          createdAt: -1,
        });

    const competitions =
      registrations
        .filter(
          (registration) =>
            registration.competition
        )
        .map((registration) => {
          const competition =
            registration.competition;

          return {
            registrationId:
              registration._id,

            registeredAt:
              registration.registeredAt,

            competition: {
              id: competition._id,
              title:
                competition.title,
              category:
                competition.category,
              tags:
                competition.tags,
              prizePool:
                competition.prizePool,
              entryFee:
                competition.entryFee,
              maxParticipants:
                competition.maxParticipants,
              participantCount:
                competition.participantCount,
              registrationStart:
                competition.registrationStart,
              registrationDeadline:
                competition.registrationDeadline,
              submissionStart:
                competition.submissionStart,
              submissionDeadline:
                competition.submissionDeadline,
              resultDate:
                competition.resultDate,

              currentState:
                getCompetitionState(
                  competition
                ),
            },
          };
        });

    const savedCompetitions =
      (user.savedCompetitions || [])
        .map((competition) => ({
          id: competition._id,
          title:
            competition.title,
          category:
            competition.category,
          tags:
            competition.tags,
          prizePool:
            competition.prizePool,
          entryFee:
            competition.entryFee,
          maxParticipants:
            competition.maxParticipants,
          participantCount:
            competition.participantCount,
          registrationStart:
            competition.registrationStart,
          registrationDeadline:
            competition.registrationDeadline,
          submissionStart:
            competition.submissionStart,
          submissionDeadline:
            competition.submissionDeadline,
          resultDate:
            competition.resultDate,

          currentState:
            getCompetitionState(
              competition
            ),
        }));

    return res.status(200).json({
      success: true,

      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          location: user.location,
          profileImage:
            user.profileImage,
          goodAt: user.goodAt,
        },

        competitions,

        savedCompetitions,
      },
    });
  } catch (error) {
    console.error(
      'Get user dashboard error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to load user dashboard',
    });
  }
}

async function updateUser(
  req,
  res
) {
  try {
    const { userId } =
      req.params;

    const {
      name,
      email,
      phone,
      location,
      goodAt,
    } = req.body;

    const result =
      await updateUserDetails(
        userId,
        {
          name,
          email,
          phone,
          location,
          goodAt,
        }
      );

    return res.status(200).json({
      success: true,
      message:
        'User details updated successfully',
      data: result,
    });
  } catch (error) {
    console.error(
      'Update user error:',
      error
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.message ||
        'Failed to update user details',
    });
  }
}

async function saveUserCompetition(
  req,
  res
) {
  try {
    const {
      userId,
      competitionId,
    } = req.params;

    const result =
      await saveCompetition(
        userId,
        competitionId
      );

    return res.status(200).json({
      success: true,
      message:
        'Competition saved successfully',
      data: result,
    });
  } catch (error) {
    console.error(
      'Save competition error:',
      error
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.message ||
        'Failed to save competition',
    });
  }
}

async function removeUserCompetition(
  req,
  res
) {
  try {
    const {
      userId,
      competitionId,
    } = req.params;

    const result =
      await removeSavedCompetition(
        userId,
        competitionId
      );

    return res.status(200).json({
      success: true,
      message:
        'Competition removed from saved',
      data: result,
    });
  } catch (error) {
    console.error(
      'Remove saved competition error:',
      error
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.message ||
        'Failed to remove saved competition',
    });
  }
}

async function getSavedCompetitionStatus(
  req,
  res
) {
  try {
    const {
      userId,
      competitionId,
    } = req.params;

    const saved =
      await isCompetitionSaved(
        userId,
        competitionId
      );

    return res.status(200).json({
      success: true,
      data: {
        saved,
      },
    });
  } catch (error) {
    console.error(
      'Get saved competition status error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to check saved competition',
    });
  }
}

module.exports = {
  getUserDashboard,
  updateUser,
  saveUserCompetition,
  removeUserCompetition,
  getSavedCompetitionStatus,
};