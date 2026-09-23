const mongoose = require('mongoose');

const registrationSchema =
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

      status: {
        type: String,
        enum: [
          'REGISTERED',
          'CANCELLED',
        ],
        default: 'REGISTERED',
        required: true,
      },

      registeredAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

registrationSchema.index(
  {
    competition: 1,
    user: 1,
  },
  {
    unique: true,
  }
);

registrationSchema.index({
  competition: 1,
  status: 1,
});

registrationSchema.index({
  user: 1,
  status: 1,
});

module.exports =
  mongoose.model(
    'Registration',
    registrationSchema
  );