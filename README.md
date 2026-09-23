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

Competition data is stored in MongoDB and retrieved through backend APIs. Competition information required for the Competition Details experience is not hardcoded in the frontend.

The implementation focuses on the functional requirements of the assignment, including competition lifecycle handling, registration state, participant capacity, remaining spots, validation, submissions, user-specific state, and backend data consistency.

The Home tab is outside the primary scope of this assignment. Development was mainly focused on the Competition Details flow and the backend functionality required to support it.

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

The submission functionality becomes available according to the competition lifecycle.

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

## 5. Important Assumptions

The following assumptions were made while implementing the assignment:

A user must be registered for a competition before submitting an entry.
Registration is available only during the configured registration period.
Submission is available only during the configured submission period.
A competition cannot accept new registrations after reaching its maximum participant capacity.
A user can have only one active registration for a competition.
A user can submit only one entry for a competition.
The competition lifecycle state is determined from the configured competition dates and the current time.
Seeded competition and user data are used for local demonstration and testing.
Full authentication and authorization are outside the primary scope of this assignment, so a predefined demo user is used.
The implementation focuses on the Competition Details workflow and its supporting functionality rather than a complete competition management platform.

## 6. Major Technical Decisions    
Backend-driven competition data

Competition information is retrieved from the backend and stored in MongoDB instead of being hardcoded in the frontend.

This allows competition details, participant counts, dates, availability, and lifecycle information to change without modifying the frontend.

Layered backend architecture

The backend is separated into routes, controllers, services, models, validators, and middleware.

Business rules such as registration eligibility, participant capacity, cancellation, saved competitions, and submission validation are handled in the service layer.

Competition lifecycle calculation

Competition state is derived from the configured registration, submission, and result dates.

This allows the application to determine the current state dynamically instead of maintaining a manually updated status in the frontend.

MongoDB indexes and constraints

Indexes and unique constraints are used for important relationships and duplicate prevention.

For example, registrations use a unique competition-user combination, while submissions prevent duplicate entries for the same user and competition.

Atomic participant capacity handling

Participant registration uses an atomic database update with a capacity condition.

This was chosen to reduce the possibility of exceeding the configured participant limit when multiple registration requests are received around the same time.

## 7. Trade-offs Considered
Polling instead of WebSockets

The frontend periodically refreshes competition information rather than maintaining a WebSocket connection.

This keeps the implementation simpler while still allowing competition information and time-dependent states to refresh.

The trade-off is that updates are not delivered instantly and depend on the polling interval.

Predefined demo user instead of full authentication

A predefined user is used to demonstrate registration, saved competitions, dashboard functionality, and submissions.

This reduces implementation complexity and keeps the project focused on the assignment requirements.

For a production application, proper authentication and authorization would be required.

Assignment-focused scope

The implementation prioritizes the Competition Details experience, competition lifecycle, registration, submissions, saved competitions, backend validation, and database consistency.

A complete Home experience, administration system, notifications, and other broader platform features were not prioritized because they are outside the primary scope of this assignment.

## 8. Improvements for Production

If this application were developed further for production, the following improvements would be considered:

Implement secure user authentication and authorization.
Replace the predefined demo user with authenticated user sessions or token-based authentication.
Add role-based access control for users, judges, and administrators.
Add API rate limiting and request throttling.
Add stronger security controls such as secure headers, input sanitization, and production CORS configuration.
Add comprehensive unit, integration, and API tests.
Add automated frontend testing for important user flows.
Replace polling with WebSockets or another real-time mechanism where immediate competition updates are required.
Add caching for frequently accessed competition data.
Add centralized logging, monitoring, and error tracking.
Deploy the application using production infrastructure with environment-specific configuration.
Use a managed and properly secured MongoDB deployment.
Add database backup and recovery procedures.
Add pagination for large competition and participant lists.
Add CI/CD pipelines for automated testing and deployment.
Perform load and concurrency testing for high-traffic registration periods.
Add an administration interface for creating and managing competitions.
## 9. API Overview
Competition APIs
GET /api/competitions
GET /api/competitions/:competitionId

Used to retrieve the competition list and individual competition details.

Registration APIs
POST   /api/competitions/:competitionId/register
GET    /api/competitions/:competitionId/registration/:userId
DELETE /api/competitions/:competitionId/registration/:userId

Used for registration, checking registration status, and cancelling registration.

Submission APIs
POST /api/competitions/:competitionId/submissions
GET  /api/competitions/:competitionId/submissions/:userId

Used to create and retrieve competition submissions.

Saved Competition APIs
POST   /api/users/:userId/saved-competitions/:competitionId
DELETE /api/users/:userId/saved-competitions/:competitionId
GET    /api/users/:userId/saved-competitions/:competitionId

Used to save, remove, and check saved competition status.

## 10. Environment Configuration

Backend environment variables are stored in the backend .env file and are excluded from version control.

Example:

PORT=5000
MONGODB_URI=your_mongodb_connection_string

The actual .env file must not be committed to GitHub.

## 11. Running the Project
Backend

From the project root:

cd backend
npm install
npm start

The backend runs on the configured port, for example:

http://localhost:5000
Frontend

From the project root:

cd frontend
npm install
npx expo start

The application can then be opened using the available Expo development options.

## 12. Seed Data

The project includes seed scripts for creating demonstration competition and user data.

The seed scripts are located at:

backend/src/seed/

The seeded competitions have different registration and submission timelines, allowing different competition lifecycle states and flows to be tested.

## 13. Assignment Scope

The main focus of this implementation is the Competition Details experience and the backend functionality required to support it.

The project demonstrates:

Dynamic backend-driven competition data.
Competition lifecycle management.
Registration and cancellation.
Participant capacity handling.
User-specific registration state.
Saved competition functionality.
Submission validation.
MongoDB data modelling.
REST API architecture.
Backend validation and error handling.
Concurrency-aware participant registration.
Reusable frontend components and hooks.

The Home tab and broader platform functionality are outside the primary scope of this internship assignment.

## 14. Conclusion

This project demonstrates a full-stack competition management workflow using React Native, Node.js, Express.js, and MongoDB.

The implementation focuses on dynamic competition data, lifecycle-based actions, backend-enforced business rules, participant capacity handling, registration and submission management, and user-specific competition interactions.