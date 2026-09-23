const express = require('express');

const cors = require('cors');

const competitionRoutes =
  require('./routes/competitionRoutes');

const registrationRoutes =
  require('./routes/registrationRoutes');

const submissionRoutes =
  require('./routes/submissionRoutes');

const userRoutes =
  require('./routes/userRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  '/api/competitions',
  competitionRoutes
);

app.use(
  '/api/registrations',
  registrationRoutes
);

app.use(
  '/api/submissions',
  submissionRoutes
);

app.use(
  '/api/users',
  userRoutes
);

app.get(
  '/api/health',
  (req, res) => {
    res.json({
      success: true,
      message: 'API is running',
    });
  }
);

module.exports = app;