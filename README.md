# Feedants Competition Details – Full Stack Development Assignment

A full-stack competition management application developed for the Feedants Full Stack Development Internship assignment.

The application provides a dynamic Competition Details experience using React Native for the frontend, Node.js and Express.js for the backend, and MongoDB with Mongoose for data storage.

## 1. Project Overview

The application allows users to explore competitions and interact with them based on the current competition stage.

The main functionality includes:

1. Viewing available competitions.
2. Viewing competition details loaded dynamically from the backend.
3. Registering for competitions.
4. Checking registration status.
5. Cancelling an active registration.
6. Saving competitions for later.
7. Viewing saved and registered competitions through the user dashboard.
8. Submitting competition entries when the submission period is active.

Competition information is stored in MongoDB and retrieved through backend APIs. Competition details are not hardcoded in the frontend.

The main focus of the project is the Competition Details flow and the backend functionality required to support it, including competition lifecycle management, registration, participant capacity, remaining spots, validation, submissions, user-specific state, and database consistency.

The Home tab is outside the primary scope of this assignment.

## 2. Features

### 2.1 Competition Details

Competition information is loaded dynamically from the backend.

The application displays:

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

The application supports multiple competitions, with each competition having its own details and lifecycle.

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

For example, registration is available only during the registration period, while submission is available only during the submission period.

### 2.3 Registration

Users can:

1. Register when registration is open.
2. Check their registration status.
3. Cancel an active registration.
4. Avoid duplicate registrations.
5. Register only during the configured registration period.
6. Register only when participant capacity is available.

Registration rules are enforced by the backend rather than relying only on frontend state.

The registration collection uses a unique competition-user combination to prevent duplicate registrations.

Participant capacity is also checked during the registration operation so that multiple users attempting to register at the same time cannot easily exceed the configured limit.

### 2.4 Competition Submission

The backend supports competition submissions with:

1. Verification that the user is registered.
2. Validation of the competition submission period.
3. HTTP and HTTPS URL validation.
4. Protection against duplicate submissions.
5. User-specific submission retrieval.

Submission functionality is controlled by the competition lifecycle and becomes available when the submission period is active.

### 2.5 Saved Competitions

Users can:

1. Save a competition.
2. Remove a saved competition.
3. Check whether a competition is already saved.
4. View saved competitions from the dashboard.

Saved competition information is stored against the corresponding user in MongoDB.

### 2.6 User Dashboard

The user dashboard provides:

1. User information.
2. Registered competitions.
3. Saved competitions.
4. Competition-specific registration status.
5. Profile information.
6. Profile information update functionality.

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
└── docs/

5. Important Assumptions

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
The implementation focuses on the Competition Details workflow and its supporting functionality rather than building a complete competition management platform.
6. Major Technical Decisions
Backend-Driven Competition Data

Competition information is stored in MongoDB and retrieved through backend APIs instead of being hardcoded in the frontend.

This allows competition details, participant counts, dates, availability, and lifecycle information to change without modifying the frontend.

Layered Backend Architecture

The backend is divided into routes, controllers, services, models, validators, and middleware.

Business rules such as registration eligibility, participant capacity, cancellation, saved competitions, and submission validation are handled in the service layer.

This keeps the main business logic separate from the API routes and makes the backend easier to maintain.

Dynamic Competition Lifecycle

The competition state is calculated from the configured registration, submission, and result dates.

This allows the application to determine the current competition stage automatically instead of manually changing the status in the frontend.

MongoDB Indexes and Constraints

Database indexes and unique constraints are used for important relationships and to prevent duplicate data.

For example, registrations use a unique competition-user combination, while submissions prevent duplicate entries for the same user and competition.

Atomic Participant Capacity Handling

Participant registration uses an atomic database update with a capacity condition.

This helps reduce the possibility of exceeding the maximum participant limit when multiple users try to register at nearly the same time.

7. Trade-offs Considered
Polling Instead of WebSockets

The frontend periodically refreshes competition information instead of using a WebSocket connection.

This keeps the implementation simpler while still allowing competition information and time-dependent states to update.

The trade-off is that updates are not received instantly and depend on the polling interval.

Predefined Demo User Instead of Full Authentication

A predefined user is used to demonstrate registration, saved competitions, dashboard functionality, and submissions.

This reduces implementation complexity and keeps the project focused on the main assignment requirements.

For a production application, proper authentication and authorization would be required.

Assignment-Focused Scope

The implementation focuses mainly on the Competition Details experience, competition lifecycle, registration, submissions, saved competitions, validation, and database consistency.

A complete Home experience, administration system, notifications, and other broader platform features were not included because they are outside the primary scope of this assignment.

8. Improvements for Production

If this application were developed further for production, the following improvements could be made:

Add secure user authentication and authorization.
Replace the predefined demo user with authenticated user accounts.
Add role-based access control for users, judges, and administrators.
Add API rate limiting and request throttling.
Improve security with secure headers, input sanitization, and production CORS configuration.
Add unit, integration, and API tests.
Add automated frontend tests for important user flows.
Replace polling with WebSockets or another real-time solution if instant competition updates are required.
Add caching for frequently requested competition data.
Add centralized logging, monitoring, and error tracking.
Deploy the application using production-ready infrastructure and environment-specific configuration.
Use a properly secured managed MongoDB deployment.
Add database backup and recovery procedures.
Add pagination for large competition and participant lists.
Add CI/CD pipelines for automated testing and deployment.
Perform load and concurrency testing for high-traffic registration periods.
Add an administration interface for creating, updating, and managing competitions.
9. Backend Architecture

The backend follows a layered structure:

Client
   |
   v
Routes
   |
   v
Controllers
   |
   v
Services
   |
   v
Models
   |
   v
MongoDB
Routes

Routes define the REST API endpoints used by the frontend.

Controllers

Controllers receive API requests, call the required service, and return the response.

Services

Services contain the main business logic, including registration, cancellation, saved competitions, submissions, competition state, and participant capacity handling.

Models

Models define the MongoDB data structures using Mongoose.

Validators and Middleware

Validators and middleware handle request validation, ObjectId validation, error handling, and invalid routes.

This structure keeps the backend organized and separates API handling from business logic.

10. Database Design

The application uses separate MongoDB models for the main entities.

Competition

Stores:

Competition information
Category and tags
Prize pool
Entry fee
Participant capacity
Current participant count
Registration dates
Submission dates
Result date
Rules
Eligibility
Judging parameters
Rewards
Previous winners
User

Stores:

User information
Contact information
Profile information
Saved competitions
Registration

Stores:

Competition reference
User reference
Registration status
Registration timestamp

A unique competition-user combination is used to prevent duplicate registrations.

Submission

Stores:

Competition reference
User reference
Submission URL
Submission timestamp

A unique constraint prevents a user from submitting more than once for the same competition.

11. API Overview
Competition APIs
GET /api/competitions
GET /api/competitions/:competitionId

Used to retrieve competition lists and individual competition details.

Registration APIs
POST   /api/competitions/:competitionId/register
GET    /api/competitions/:competitionId/registration/:userId
DELETE /api/competitions/:competitionId/registration/:userId

Used for registration, registration status, and cancellation.

Submission APIs
POST /api/competitions/:competitionId/submissions
GET  /api/competitions/:competitionId/submissions/:userId

Used to create and retrieve competition submissions.

Saved Competition APIs
POST   /api/users/:userId/saved-competitions/:competitionId
DELETE /api/users/:userId/saved-competitions/:competitionId
GET    /api/users/:userId/saved-competitions/:competitionId

Used to save, remove, and check saved competition status.

12. Environment Configuration

Backend environment variables are stored in the backend .env file and are excluded from version control.

Example:

PORT=5000
MONGODB_URI=your_mongodb_connection_string

The actual .env file must not be committed to GitHub.

13. Running the Project
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

14. Seed Data

The project includes seed scripts for creating demonstration competition and user data.

The seed scripts are located at:

backend/src/seed/

The seeded competitions have different registration and submission timelines, allowing different competition lifecycle states and flows to be tested.

15. Assignment Scope

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

16. Conclusion

This project demonstrates a full-stack competition management workflow using React Native, Node.js, Express.js, and MongoDB.

The implementation focuses on dynamic competition data, lifecycle-based actions, backend-enforced business rules, participant capacity handling, registration and submission management, and user-specific competition interactions.


This is the **single complete README**. You can replace your current `README.md` entirely with it.

After saving it, run:

```powershell
git add README.md
git commit -m "Update README documentation"
git push

Then the GitHub repository will contain the complete README with all four assignment requirements




    ├── api/    
    └── architecture/
