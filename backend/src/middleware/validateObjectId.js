const mongoose = require('mongoose');

function validateObjectId(parameterName) {
  return (req, res, next) => {
    const value = req.params[parameterName];

    if (!mongoose.Types.ObjectId.isValid(value)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${parameterName}`,
      });
    }

    next();
  };
}

module.exports = validateObjectId;