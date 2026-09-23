const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const winnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: '',
    },
  },
  {
    _id: false,
  }
);

const judgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    profession: {
      type: String,
      default: '',
      trim: true,
    },

    experience: {
      type: String,
      default: '',
      trim: true,
    },

    image: {
      type: String,
      default: '',
    },

    introVideo: {
      type: String,
      default: '',
    },
  },
  {
    _id: false,
  }
);

const competitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    prizePool: {
      type: Number,
      required: true,
      min: 0,
    },

    entryFee: {
      type: Number,
      required: true,
      min: 0,
    },

    maxParticipants: {
      type: Number,
      required: true,
      min: 1,
    },

    participantCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    registrationStart: {
      type: Date,
      required: true,
    },

    registrationDeadline: {
      type: Date,
      required: true,
    },

    submissionStart: {
      type: Date,
      required: true,
    },

    submissionDeadline: {
      type: Date,
      required: true,
    },

    resultDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        'UPCOMING',
        'REGISTRATION_OPEN',
        'REGISTRATION_CLOSED',
        'SUBMISSION_OPEN',
        'SUBMISSION_CLOSED',
        'RESULT_DECLARED',
      ],
      default: 'UPCOMING',
    },

    judge: {
      type: judgeSchema,
      required: true,
    },

    description: {
      type: String,
      default: '',
      trim: true,
    },

    judgingParameters: {
      type: [String],
      default: [],
    },

    rules: {
      type: [String],
      default: [],
    },

    eligibility: {
      type: [String],
      default: [],
    },

    rewards: {
      type: [rewardSchema],
      default: [],
    },

    previousWinners: {
      type: [winnerSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

competitionSchema.index({
  status: 1,
});

competitionSchema.index({
  registrationDeadline: 1,
});

module.exports = mongoose.model(
  'Competition',
  competitionSchema
);