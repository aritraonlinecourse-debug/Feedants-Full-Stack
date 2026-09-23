# Feedants Competition Details – Full Stack Development Assignment

A full-stack competition management application developed for the Feedants Full Stack Development Internship assignment.

The project implements a dynamic Competition Details experience using React Native for the frontend, Node.js and Express.js for the backend, and MongoDB with Mongoose for data storage.

## 1. Project Overview

The application allows users to explore competitions and interact with them based on their current lifecycle stage.

The main functionality includes:

1. Viewing available competitions.
2. Viewing dynamically loaded competition details.
3. Registering for competitions.
4. Checking registration status.
5. Cancelling an active registration.
6. Saving competitions for later.
7. Viewing saved and registered competitions through the dashboard.
8. Submitting competition entries when submissions are open.

Competition data is stored in MongoDB and retrieved through backend APIs. No competition information required for the Competition Details experience is hardcoded in the frontend.

The implementation focuses on the functional requirements of the assignment, particularly competition lifecycle handling, registration state, participant capacity, remaining spots, validation, submissions, user-specific state, and backend data consistency.

The Home tab is outside the primary scope of this assignment. Development was focused mainly on the Competition Details flow and the backend functionality required to support it.

## 2. Features

### 2.1 Competition Details

Competition information is loaded dynamically from the backend and includes:

1. Competition title.
2. Category and tags.
3. Prize pool.
4. Entry fee.
5. Current participant count.
6. Maximum participant capacity.
7. Remaining spots.
8. Judge information.
9. Competition description.
10. Judging parameters.
11. Rules.
12. Eligibility requirements.
13. Rewards.
14. Previous winners.

Multiple competitions are supported, with each competition having its own details and lifecycle.

### 2.2 Competition Lifecycle

The current competition state is calculated using the configured competition dates and the current time.

The application supports the following states:

1. Upcoming
2. Registration Open
3. Registration Closed
4. Submission Open
5. Submission Closed
6. Result Declared

The current state is used by the frontend and backend to determine which information and actions should be available.

For example, registration is allowed only during the registration period, while submission is available only during the submission period.

### 2.3 Registration

Users can:

1. Register when registration is open.
2. Check their registration status.
3. Cancel an active registration.
4. Avoid duplicate registrations.
5. Register only within the configured registration period.
6. Register only when participant capacity is available.

Registration rules are enforced by the backend rather than relying only on frontend state.

The registration collection uses a unique competition-user combination to prevent duplicate registrations.

Participant capacity is also checked during the registration operation to provide safer handling when multiple users attempt to register at the same time.

### 2.4 Competition Submission

The backend supports competition submissions with:

1. Verification that the user is registered.
2. Validation of the competition submission period.
3. HTTP/HTTPS URL validation.
4. Protection against duplicate submissions.
5. User-specific submission retrieval.

The submission functionality becomes available according to the competition's lifecycle.

### 2.5 Saved Competitions

Users can:

1. Save competitions.
2. Remove saved competitions.
3. Check whether a competition is already saved.
4. View saved competitions from the dashboard.

Saved competition information is stored against the corresponding user in MongoDB.

### 2.6 User Dashboard

The dashboard provides access to:

1. User information.
2. Registered competitions.
3. Saved competitions.
4. Competition-specific registration status.
5. Profile information.
6. Profile information updates.

### 2.7 Validation and Error Handling

The backend validates important application operations, including:

1. MongoDB ObjectId values.
2. Competition existence.
3. User existence.
4. Registration lifecycle.
5. Participant capacity.
6. Submission lifecycle.
7. Submission URL format.
8. Duplicate registrations.
9. Duplicate submissions.
10. Duplicate saved competitions.
11. User email format.
12. User phone format.

Centralized error handling and validation middleware are also used to keep backend behavior consistent.

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