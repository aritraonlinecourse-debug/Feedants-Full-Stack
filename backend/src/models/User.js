// backend/src/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
      default: '',
    },

    location: {
      type: String,
      trim: true,
      default: '',
    },

    profileImage: {
      type: String,
      trim: true,
      default: '',
    },

    goodAt: {
      type: [String],
      default: [],
    },

    savedCompetitions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Competition',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.index({
  savedCompetitions: 1,
});

module.exports = mongoose.model(
  'User',
  userSchema
);