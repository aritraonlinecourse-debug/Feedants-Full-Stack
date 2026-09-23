const mongoose = require('mongoose');

const submissionSchema =
  new mongoose.Schema(
    {
      competition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Competition',
        required: true,
        index: true,
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },

      submissionUrl: {
        type: String,
        required: true,
        trim: true,
      },

      submittedAt: {
        type: Date,
        default: Date.now,
      },

      status: {
        type: String,
        enum: [
          'SUBMITTED',
          'UNDER_REVIEW',
          'JUDGED',
        ],
        default: 'SUBMITTED',
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

submissionSchema.index(
  {
    competition: 1,
    user: 1,
  },
  {
    unique: true,
  }
);

submissionSchema.index({
  competition: 1,
  status: 1,
});

module.exports =
  mongoose.model(
    'Submission',
    submissionSchema
  );