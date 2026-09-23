# Feedants Competition Details – Full Stack Development Assignment

A full-stack competition management application developed for the Feedants Full Stack Development Internship assignment.

The application uses React Native for the frontend, Node.js and Express.js for the backend, and MongoDB with Mongoose for the database.

## 1. Project Overview

The application allows users to explore competitions and interact with them based on their current status.

The main features are:

1. View available competitions.
2. View competition details loaded from the backend.
3. Register for competitions.
4. Check registration status.
5. Cancel a registration.
6. Save competitions.
7. View saved and registered competitions from the dashboard.
8. Submit competition entries when submissions are open.

All competition information is stored in MongoDB and loaded through backend APIs. Competition data is not hardcoded in the frontend.

The main focus of the project is the Competition Details functionality, including competition status, registration, participant limits, remaining spots, submissions, validation, and user-specific actions.

The Home tab is outside the main scope of this assignment.

## 2. Features

### 2.1 Competition Details

Competition details are loaded dynamically from the backend.

The application displays:

1. Competition title.
2. Category and tags.
3. Prize pool.
4. Entry fee.
5. Current number of participants.
6. Maximum participants.
7. Remaining spots.
8. Judge information.
9. Competition description.
10. Judging parameters.
11. Rules.
12. Eligibility requirements.
13. Rewards.
14. Previous winners.

The application supports multiple competitions, and each competition has its own details and timeline.

### 2.2 Competition Lifecycle

The competition status is calculated using the competition dates and the current time.

The supported states are:

1. Upcoming
2. Registration Open
3. Registration Closed
4. Submission Open
5. Submission Closed
6. Result Declared

The current state controls which actions are available to the user.

For example, users can register only when registration is open, and they can submit an entry only when submissions are open.

### 2.3 Registration

Users can:

1. Register when registration is open.
2. Check their registration status.
3. Cancel an active registration.
4. Prevent duplicate registrations.
5. Register only during the registration period.
6. Register only when spots are available.

These rules are checked by the backend instead of depending only on the frontend.

A unique competition-user combination is used to prevent duplicate registrations.

Participant capacity is also checked during registration so that multiple users registering at nearly the same time do not easily exceed the competition limit.

### 2.4 Competition Submission

The backend supports competition submissions.

It checks:

1. Whether the user is registered.
2. Whether submissions are currently open.
3. Whether the submitted URL uses HTTP or HTTPS.
4. Whether the user has already submitted an entry.
5. The user's submission for a specific competition.

Submission availability depends on the competition lifecycle.

### 2.5 Saved Competitions

Users can:

1. Save a competition.
2. Remove a saved competition.
3. Check whether a competition is already saved.
4. View saved competitions from the dashboard.

Saved competitions are stored in the user's MongoDB record.

### 2.6 User Dashboard

The dashboard provides:

1. User information.
2. Registered competitions.
3. Saved competitions.
4. Registration status.
5. Profile information.
6. Profile update functionality.

### 2.7 Validation and Error Handling

The backend validates important requests, including:

1. MongoDB ObjectId values.
2. Competition existence.
3. User existence.
4. Registration timing.
5. Participant capacity.
6. Submission timing.
7. Submission URL format.
8. Duplicate registrations.
9. Duplicate submissions.
10. Duplicate saved competitions.
11. User email format.
12. User phone format.

Centralized error handling and validation middleware are also used to handle invalid requests consistently.

## 3. Technology Stack

### Frontend

- React Native
- JavaScript
- Expo
- React Native Safe Area Context
- React Native Vector Icons

### Backend

- Node.js
- Express.js
- JavaScript
- REST APIs

### Database

- MongoDB
- Mongoose

## 4. Project Structure

```text
Feedants-Full-Stack-Assignment/

├── README.md
├── LICENSE
├── .gitignore
│
├── frontend/
│   ├── App.js
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── constants/
│       ├── context/
│       ├── hooks/
│       ├── navigation/
│       ├── screens/
│       ├── services/
│       └── styles/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── seed/
│       ├── services/
│       ├── utils/
│       └── validators/
│
├── database/
│   ├── sample-data/
│   └── schema/
│
└── docs/
    ├── api/
    └── architecture/
