# TapIn - Complete User Stories & Product Backlog

**Project:** TapIn - Volunteer Matching Platform  
**Timeline:** 4 weeks  
**Team:** 2 developers  
**Date Created:** October 23, 2025

---

## User Story Format Template

Each user story follows this format:

```
US-XXX: [PRIORITY] As a [user role], I want [action/goal]
        so that [benefit/outcome]

Acceptance Criteria:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

Technical Notes:
- Technology/API considerations
- Complexity: [Low/Medium/High]
- Estimated Hours: X-Y
- Sprint: [Week 1-4]
- Dependencies: [Related user stories]
```

---

## SPRINT 1: AUTHENTICATION & FOUNDATION (Week 1)

### US-001: [CRITICAL] User Registration - Volunteer

**As a volunteer, I want to register with my email and password so that I can create an account on TapIn**

Acceptance Criteria:

- [ ] Registration form displays email and password fields
- [ ] Form validates email format (RFC 5322 compliant)
- [ ] Form validates password strength (min 8 chars, 1 uppercase, 1 number, 1 special char)
- [ ] Password is encrypted with bcrypt before storage
- [ ] Success message displays after registration
- [ ] User is redirected to profile setup page
- [ ] Email verification link is sent (optional for MVP, but plan for it)
- [ ] Duplicate email prevents registration with clear error message

Technical Notes:

- Database: `users` table with `user_type='volunteer'`
- Backend: POST `/api/auth/register` endpoint
- Library: bcryptjs for password hashing
- Complexity: Medium
- Estimated Hours: 6-8
- Sprint: Week 1
- Dependencies: None

---

### US-002: [CRITICAL] User Registration - Organization

**As an organization, I want to register with my organization details and password so that I can post volunteer opportunities**

Acceptance Criteria:

- [ ] Registration form displays organization name, email, password fields
- [ ] Organization name is required and max 255 characters
- [ ] Email validation same as volunteer registration
- [ ] Password encryption same as volunteer registration
- [ ] Organization type selector available (nonprofit, gov agency, corporate, educational)
- [ ] Phone number (optional) is validated
- [ ] Success message displays after registration
- [ ] User is redirected to organization profile setup

Technical Notes:

- Database: `users` table with `user_type='organization'`
- Backend: POST `/api/auth/register` endpoint (reuse logic with type parameter)
- Complexity: Medium
- Estimated Hours: 6-8
- Sprint: Week 1
- Dependencies: US-001

---

### US-003: [CRITICAL] User Login

**As any user (volunteer or organization), I want to log in with my email and password so that I can access my account**

Acceptance Criteria:

- [ ] Login form displays email and password fields
- [ ] Form validates both fields are filled
- [ ] Incorrect email shows "Account not found" message
- [ ] Incorrect password shows "Invalid password" message
- [ ] Successful login generates JWT token
- [ ] JWT token is stored in secure httpOnly cookie
- [ ] User is redirected to appropriate dashboard (volunteer or organization)
- [ ] Login persists across page refreshes (token in cookie)
- [ ] "Remember me" option available (optional for MVP)

Technical Notes:

- Backend: POST `/api/auth/login` endpoint
- Library: jsonwebtoken (JWT)
- Security: httpOnly, Secure, SameSite cookies
- Complexity: Medium
- Estimated Hours: 6-8
- Sprint: Week 1
- Dependencies: US-001, US-002

---

### US-004: [CRITICAL] Password Reset

**As a user, I want to reset my password if I forget it so that I can regain access to my account**

Acceptance Criteria:

- [ ] "Forgot Password" link available on login page
- [ ] User enters email address
- [ ] System validates email exists in database
- [ ] Password reset link is emailed to user
- [ ] Reset link expires after 1 hour
- [ ] Reset page displays password form (new password + confirm)
- [ ] New password must meet strength requirements (same as registration)
- [ ] Success message confirms password update
- [ ] User can log in with new password immediately

Technical Notes:

- Backend: POST `/api/auth/forgot-password` endpoint
- Backend: POST `/api/auth/reset-password/:token` endpoint
- Database: `password_reset_tokens` table with expiration
- Email Service: SendGrid (plan for Week 4 integration)
- Complexity: Medium
- Estimated Hours: 6-8
- Sprint: Week 1 (core logic), Week 4 (email integration)
- Dependencies: US-001, US-002

---

### US-005: [HIGH] User Logout

**As a user, I want to log out so that I can end my session securely**

Acceptance Criteria:

- [ ] Logout button appears in navigation/header
- [ ] Clicking logout clears JWT token from cookie
- [ ] User is redirected to login page
- [ ] Back button does not allow access to protected routes
- [ ] Session is fully terminated on backend

Technical Notes:

- Backend: POST `/api/auth/logout` endpoint
- Frontend: Clear auth context/state
- Complexity: Low
- Estimated Hours: 2-3
- Sprint: Week 1
- Dependencies: US-003

---

### US-006: [HIGH] Basic Navigation Layout

**As a user, I want to see consistent navigation across the app so that I can access key features easily**

Acceptance Criteria:

- [ ] Header displays app logo "TapIn"
- [ ] Navigation shows different menu items for volunteers vs. organizations
- [ ] User avatar/profile menu in top right
- [ ] Logout option in profile menu
- [ ] Mobile-responsive hamburger menu
- [ ] Active page is highlighted in navigation
- [ ] Navigation consistent across all pages

Technical Notes:

- Frontend: React component for Header/Navigation
- Styling: Tailwind CSS
- Complexity: Low
- Estimated Hours: 4-6
- Sprint: Week 1
- Dependencies: None

---

### US-007: [MEDIUM] Account Settings Page

**As a user, I want to access account settings so that I can manage my account security and preferences**

Acceptance Criteria:

- [ ] Settings page displays current email
- [ ] Change password functionality available
- [ ] Old password verification required before change
- [ ] Delete account option available
- [ ] Confirmation dialog before account deletion
- [ ] Privacy settings (optional for MVP)
- [ ] Notification preferences (optional for MVP)

Technical Notes:

- Backend: PUT `/api/users/:id/settings` endpoint
- Backend: DELETE `/api/users/:id` endpoint (soft delete recommended)
- Frontend: Secure form with password confirmation
- Complexity: Medium
- Estimated Hours: 5-7
- Sprint: Week 1
- Dependencies: US-003

---

### US-008: [CRITICAL] Database Schema Implementation

**As the system, I need a properly designed database schema so that data is stored reliably and efficiently**

Acceptance Criteria:

- [ ] All tables created in PostgreSQL (users, volunteer_profiles, organizations, skills, interests, opportunities, applications)
- [ ] Primary keys defined on all tables
- [ ] Foreign key constraints enforced
- [ ] Indexes created on frequently queried columns (email, user_id, opportunity_id)
- [ ] NOT NULL constraints on required fields
- [ ] DEFAULT values set for created_at, updated_at timestamps
- [ ] Migrations tracked in version control

Technical Notes:

- Database: PostgreSQL
- Tool: Node migrations (or manual SQL files)
- Complexity: Medium
- Estimated Hours: 4-6
- Sprint: Week 1 (beginning of project)
- Dependencies: None

---

## SPRINT 2: CORE CRUD & PROFILES (Week 2)

### US-009: [CRITICAL] Volunteer Profile Creation

**As a volunteer, I want to create my profile with skills, availability, and interests so that I can be matched to relevant opportunities**

Acceptance Criteria:

- [ ] Profile form displays all required fields: bio, location, availability
- [ ] Volunteer can add multiple skills (min 1, max 10)
- [ ] Skill entry includes skill name and proficiency level (beginner/intermediate/expert)
- [ ] Volunteer can add interests (e.g., education, environment, health, social services)
- [ ] Location field has autocomplete (Google Places API)
- [ ] Availability options: weekdays, weekends, flexible
- [ ] Form saves all data to database
- [ ] Success message displayed
- [ ] Profile can be viewed after creation

Technical Notes:

- Database: `volunteer_profiles`, `skills`, `interests` tables
- Backend: POST `/api/volunteers/profile` endpoint
- Backend: GET `/api/volunteers/profile/:id` endpoint
- Frontend: Multi-step form or single form with skill/interest selectors
- Google Places API for location autocomplete
- Complexity: High
- Estimated Hours: 10-12
- Sprint: Week 2
- Dependencies: US-003 (authenticated user)

---

### US-010: [CRITICAL] Volunteer Profile Editing

**As a volunteer, I want to edit my profile so that I can keep my information current**

Acceptance Criteria:

- [ ] Profile edit form pre-populates with current data
- [ ] Volunteer can update all profile fields
- [ ] Volunteer can add/remove skills
- [ ] Volunteer can add/remove interests
- [ ] Changes are saved to database
- [ ] Success message confirms update
- [ ] Last updated timestamp is recorded
- [ ] User sees "unsaved changes" warning if navigating away without saving

Technical Notes:

- Backend: PUT `/api/volunteers/profile/:id` endpoint
- Frontend: Form with pre-filled values
- Complexity: High
- Estimated Hours: 8-10
- Sprint: Week 2
- Dependencies: US-009

---

### US-011: [HIGH] Volunteer Profile Viewing

**As a volunteer, I want to view my profile so that I can see what information is visible to organizations**

Acceptance Criteria:

- [ ] Profile page displays all volunteer information
- [ ] Skills and proficiency levels are listed
- [ ] Interests are displayed as tags/badges
- [ ] Location and availability are shown
- [ ] Profile is read-only in view mode
- [ ] Edit button available to switch to edit mode
- [ ] Profile looks professional and clean

Technical Notes:

- Backend: GET `/api/volunteers/:id` endpoint
- Frontend: Profile detail component
- Complexity: Low
- Estimated Hours: 4-6
- Sprint: Week 2
- Dependencies: US-009

---

### US-012: [CRITICAL] Organization Profile Setup

**As an organization, I want to set up my organization profile so that volunteers can learn about us**

Acceptance Criteria:

- [ ] Profile form displays organization name, description, website, phone
- [ ] Description field supports rich text (optional for MVP)
- [ ] Organization type displayed (from registration)
- [ ] Location/headquarters can be set
- [ ] Logo upload available (optional for MVP)
- [ ] Contact email for applications displayed
- [ ] All data saved to database
- [ ] Profile visible to volunteers

Technical Notes:

- Database: `users` table (organization fields)
- Backend: POST `/api/organizations/profile` endpoint
- Backend: GET `/api/organizations/:id` endpoint
- File storage: Cloudinary or local storage (MVP can skip logo initially)
- Complexity: Medium
- Estimated Hours: 8-10
- Sprint: Week 2
- Dependencies: US-002 (organization user created)

---

### US-013: [CRITICAL] Create Volunteer Opportunity

**As an organization, I want to post a volunteer opportunity so that volunteers can discover and apply**

Acceptance Criteria:

- [ ] Opportunity form displays: title, description, required skills, location, time commitment, urgency
- [ ] Title is required (max 200 characters)
- [ ] Description is required (supports formatting for MVP: bold, lists, line breaks)
- [ ] Required skills: multi-select from skill database or custom entry
- [ ] Location has autocomplete (Google Places)
- [ ] Time commitment options: one-time, weekly, monthly, flexible
- [ ] Urgency level: low, medium, high
- [ ] Number of spots available (default 1, max 100)
- [ ] Form validation shows errors for required fields
- [ ] Opportunity saved to database
- [ ] Success message displayed
- [ ] Organization is notified via email

Technical Notes:

- Database: `opportunities` table
- Backend: POST `/api/opportunities` endpoint
- Google Places API for location
- Complexity: High
- Estimated Hours: 10-12
- Sprint: Week 2
- Dependencies: US-012 (organization profile)

---

### US-014: [HIGH] View Opportunity Details

**As a volunteer, I want to view detailed information about an opportunity so that I can decide whether to apply**

Acceptance Criteria:

- [ ] Opportunity detail page displays: title, description, required skills, location, time commitment
- [ ] Organization name and contact info displayed
- [ ] Number of spots available shown
- [ ] Application button visible if volunteer hasn't applied
- [ ] "Already applied" indicator if volunteer has applied
- [ ] Application status shown if applicable
- [ ] Clean, readable layout

Technical Notes:

- Backend: GET `/api/opportunities/:id` endpoint
- Frontend: Opportunity detail component
- Complexity: Low
- Estimated Hours: 4-6
- Sprint: Week 2
- Dependencies: US-013

---

### US-015: [HIGH] Edit Volunteer Opportunity

**As an organization, I want to edit opportunity details so that I can update requirements or close opportunities**

Acceptance Criteria:

- [ ] Edit form pre-populates with current opportunity data
- [ ] All fields can be edited except opportunity ID
- [ ] Form validation same as creation
- [ ] Changes saved to database
- [ ] Last updated timestamp recorded
- [ ] Success message displayed
- [ ] Changes do not affect existing applications

Technical Notes:

- Backend: PUT `/api/opportunities/:id` endpoint
- Frontend: Pre-filled form component
- Complexity: Medium
- Estimated Hours: 6-8
- Sprint: Week 2
- Dependencies: US-013

---

### US-016: [MEDIUM] Delete Volunteer Opportunity

**As an organization, I want to delete an opportunity so that I can remove postings that are no longer needed**

Acceptance Criteria:

- [ ] Delete button available on opportunity edit page
- [ ] Confirmation dialog displayed before deletion
- [ ] Opportunity removed from database
- [ ] Associated applications marked as closed
- [ ] Volunteers with pending applications notified
- [ ] Success message displayed

Technical Notes:

- Backend: DELETE `/api/opportunities/:id` endpoint (soft delete recommended)
- Email: Send notification to applicants if applicable
- Complexity: Medium
- Estimated Hours: 6-8
- Sprint: Week 2
- Dependencies: US-013, US-015

---

### US-017: [MEDIUM] Organization Dashboard - View Posted Opportunities

**As an organization, I want to view all my posted opportunities on a dashboard so that I can manage them**

Acceptance Criteria:

- [ ] Dashboard displays list of all organization's opportunities
- [ ] Each opportunity shows: title, location, number of applicants, date posted
- [ ] Opportunities sorted by most recent first
- [ ] Search/filter by status (open, closed, filled)
- [ ] Edit and delete buttons available for each opportunity
- [ ] Pagination if 10+ opportunities
- [ ] Empty state message if no opportunities posted

Technical Notes:

- Backend: GET `/api/organizations/:id/opportunities` endpoint
- Frontend: Dashboard component with opportunity list
- Complexity: Medium
- Estimated Hours: 8-10
- Sprint: Week 2
- Dependencies: US-013

---

## SPRINT 3: MATCHING & DISCOVERY (Week 3)

### US-018: [CRITICAL] Volunteer Discovery - Matched Opportunities List

**As a volunteer, I want to see a list of opportunities matched to my profile so that I can find relevant volunteer work**

Acceptance Criteria:

- [ ] Dashboard displays opportunities ranked by match score (highest first)
- [ ] Match score calculation based on: skills match (50%), availability (30%), location proximity (20%)
- [ ] Each opportunity shows: title, organization, match percentage, location distance
- [ ] Click on opportunity to view details
- [ ] Apply button visible on opportunity cards
- [ ] Pagination if 10+ opportunities
- [ ] Empty state message if no matches found
- [ ] Filter options available: availability, distance, skills
- [ ] Sort options: match score, most recent, distance

Technical Notes:

- Backend: GET `/api/volunteers/:id/matched-opportunities` endpoint
- Algorithm: Skill similarity (fuzzy matching or exact), availability overlap, geolocation distance
- Database query optimization: indexes on skills, availability, location
- Google Maps API for distance calculation (or hardcode for MVP)
- Complexity: High
- Estimated Hours: 12-16
- Sprint: Week 3
- Dependencies: US-009 (volunteer profile), US-013 (opportunities)

---

### US-019: [CRITICAL] Matching Algorithm Implementation

**As the system, I need an intelligent matching algorithm so that volunteers are matched to relevant opportunities**

Acceptance Criteria:

- [ ] Algorithm calculates skill similarity score (0-100)
- [ ] Algorithm checks availability overlap (exact match or partial)
- [ ] Algorithm calculates location proximity (distance in miles/km)
- [ ] Algorithm combines scores with weightings: skills 50%, availability 30%, location 20%
- [ ] Final match score ranges from 0-100
- [ ] Only opportunities with match score 50+ are shown
- [ ] Algorithm runs efficiently (sub-1 second response)
- [ ] Results are consistent and reproducible

Technical Notes:

- Backend: Separate utility function for matching
- Skill matching: Levenshtein distance or exact match
- Location: Haversine formula or Google Maps distance API
- Complexity: High
- Estimated Hours: 10-14
- Sprint: Week 3 (core logic)
- Dependencies: US-009, US-013

---

### US-020: [HIGH] Organization Discovery - Matched Volunteers List

**As an organization, I want to see volunteers matched to my posted opportunities so that I can find qualified applicants**

Acceptance Criteria:

- [ ] Dashboard displays list of volunteers matched to each opportunity
- [ ] Volunteers ranked by match score (highest first)
- [ ] Each volunteer shows: name, skills, availability, match percentage
- [ ] Click on volunteer to view their full profile
- [ ] Organizations can view applicants they haven't contacted yet
- [ ] Match scores explained in tooltip
- [ ] Pagination if 20+ matched volunteers

Technical Notes:

- Backend: GET `/api/organizations/:id/matched-volunteers` endpoint (or per opportunity)
- Frontend: Matched volunteer list component
- Complexity: High
- Estimated Hours: 10-12
- Sprint: Week 3
- Dependencies: US-017, US-019

---

### US-021: [CRITICAL] Apply to Opportunity

**As a volunteer, I want to apply to an opportunity so that I can express interest to the organization**

Acceptance Criteria:

- [ ] Application form displays opportunity details (read-only)
- [ ] Optional message field for volunteer to add note (max 500 chars)
- [ ] Submit button sends application to database
- [ ] Application records: volunteer_id, opportunity_id, timestamp, match_score, message
- [ ] Success message displayed to volunteer
- [ ] "Already applied" message if volunteer re-visits and has already applied
- [ ] Application cannot be submitted if required fields missing
- [ ] Organization receives notification of new application

Technical Notes:

- Database: `applications` table
- Backend: POST `/api/applications` endpoint
- Backend: Check for duplicate applications (unique constraint)
- Email notification to organization (Week 4)
- Complexity: Medium
- Estimated Hours: 8-10
- Sprint: Week 3
- Dependencies: US-014 (view opportunity)

---

### US-022: [HIGH] View Application Status

**As a volunteer, I want to see the status of my applications so that I know where things stand with each opportunity**

Acceptance Criteria:

- [ ] Volunteer dashboard shows all applications
- [ ] Status displayed: pending, accepted, rejected
- [ ] Application date shown
- [ ] Opportunity title linked to details
- [ ] Organization contact info displayed if accepted
- [ ] Message/feedback shown if rejected (if organization provides)
- [ ] Filter by status (pending, accepted, rejected)
- [ ] Sort by date or organization name

Technical Notes:

- Backend: GET `/api/volunteers/:id/applications` endpoint
- Frontend: Application list component
- Complexity: Medium
- Estimated Hours: 8-10
- Sprint: Week 3
- Dependencies: US-021

---

### US-023: [CRITICAL] Organization - Accept/Reject Applications

**As an organization, I want to accept or reject volunteer applications so that I can confirm volunteers for opportunities**

Acceptance Criteria:

- [ ] Application review page shows: volunteer profile, application message, match score
- [ ] Accept button confirms volunteer selection
- [ ] Reject button with optional feedback message field
- [ ] Confirmation dialog before accepting/rejecting
- [ ] Action recorded with timestamp
- [ ] Volunteer receives email notification of decision
- [ ] Once volunteer accepted, opportunity can be closed if full
- [ ] Cannot accept more volunteers than spots available

Technical Notes:

- Backend: PUT `/api/applications/:id/status` endpoint
- Database: Update application status, timestamp, feedback
- Email notification (Week 4)
- Complexity: Medium
- Estimated Hours: 8-10
- Sprint: Week 3
- Dependencies: US-020

---

### US-024: [HIGH] Organization Dashboard - View Applicants

**As an organization, I want to see all applicants for my opportunities so that I can manage applications**

Acceptance Criteria:

- [ ] Dashboard shows list of all applications received
- [ ] Grouped by opportunity or displayed in flat list (user choice)
- [ ] Each application shows: volunteer name, opportunity, date applied, status
- [ ] Status colors: pending (yellow), accepted (green), rejected (red)
- [ ] Pagination if 20+ applications
- [ ] Filter by status, opportunity, date range
- [ ] Sort by date, status, or volunteer name
- [ ] Quick action buttons: accept, reject, view profile

Technical Notes:

- Backend: GET `/api/organizations/:id/applications` endpoint
- Frontend: Application management dashboard
- Complexity: Medium
- Estimated Hours: 10-12
- Sprint: Week 3
- Dependencies: US-021, US-023

---

### US-025: [MEDIUM] Search & Filter Opportunities (Volunteer)

**As a volunteer, I want to search and filter opportunities so that I can find relevant volunteer work beyond matches**

Acceptance Criteria:

- [ ] Search by opportunity title, description, organization name
- [ ] Filter by: skills required, time commitment, urgency, distance
- [ ] Multiple filters can be combined
- [ ] Filter results update in real-time
- [ ] Clear filters button resets to matched view
- [ ] Number of results shown
- [ ] Empty state if no results match

Technical Notes:

- Backend: GET `/api/opportunities?filters` endpoint with query parameters
- Frontend: Filter sidebar component
- Database: Full-text search or LIKE queries (for MVP)
- Complexity: Medium
- Estimated Hours: 8-10
- Sprint: Week 3
- Dependencies: US-018

---

### US-026: [MEDIUM] Search & Filter Volunteers (Organization)

**As an organization, I want to search and filter applicants so that I can find the right volunteers**

Acceptance Criteria:

- [ ] Search by volunteer name, email, skills
- [ ] Filter by: skills, availability, distance, match score range
- [ ] Multiple filters can be combined
- [ ] Filter results update in real-time
- [ ] Clear filters button
- [ ] Number of results shown
- [ ] Sort options: name, match score, date applied

Technical Notes:

- Backend: GET `/api/volunteers?filters` endpoint
- Frontend: Filter/search component in organization dashboard
- Complexity: Medium
- Estimated Hours: 8-10
- Sprint: Week 3
- Dependencies: US-020

---

## SPRINT 4: POLISH, INTEGRATION & DEPLOYMENT (Week 4)

### US-027: [HIGH] Email Notification - New Match

**As a volunteer, I want to receive email notifications when new opportunities match my profile so that I can discover opportunities quickly**

Acceptance Criteria:

- [ ] Email sent within 5 minutes of new matching opportunity
- [ ] Email displays: opportunity title, organization, match score, action link
- [ ] Email has unsubscribe link
- [ ] Email design is professional and mobile-responsive
- [ ] Volunteer can opt out of notifications in settings

Technical Notes:

- Service: SendGrid API
- Backend: Email service integration
- Email template: HTML + plain text
- Trigger: When opportunity created and matches volunteer
- Complexity: Medium
- Estimated Hours: 6-8
- Sprint: Week 4
- Dependencies: US-018

---

### US-028: [HIGH] Email Notification - Application Received

**As an organization, I want to receive email notifications when volunteers apply so that I can respond promptly**

Acceptance Criteria:

- [ ] Email sent immediately when application received
- [ ] Email displays: volunteer name, skills, application message, action link
- [ ] Email has link to review applicant
- [ ] Organization can opt out in settings (but not recommended)

Technical Notes:

- Service: SendGrid API
- Backend: Email service integration
- Trigger: POST `/api/applications` endpoint
- Complexity: Medium
- Estimated Hours: 6-8
- Sprint: Week 4
- Dependencies: US-021

---

### US-029: [HIGH] Email Notification - Application Status Update

**As a volunteer, I want to receive email notification when an organization accepts or rejects my application so that I know the decision**

Acceptance Criteria:

- [ ] Email sent immediately when application status changes
- [ ] Email displays: opportunity title, organization, decision, next steps
- [ ] Accept email includes organization contact info
- [ ] Reject email can include feedback message if provided

Technical Notes:

- Service: SendGrid API
- Trigger: PUT `/api/applications/:id/status` endpoint
- Complexity: Low
- Estimated Hours: 4-6
- Sprint: Week 4
- Dependencies: US-023

---

### US-030: [MEDIUM] Error Handling & User Feedback

**As a user, I want clear error messages and feedback so that I understand what went wrong and how to fix it**

Acceptance Criteria:

- [ ] All form submissions show validation errors (field-level)
- [ ] API errors display user-friendly messages (not technical jargon)
- [ ] Success messages appear for all CRUD actions
- [ ] Loading states displayed during async operations
- [ ] Timeout errors handled gracefully
- [ ] 404 pages for not-found resources
- [ ] 500 page for server errors with support contact

Technical Notes:

- Frontend: Error boundary component
- Backend: Global error handler middleware
- Frontend: Toast/notification component for user feedback
- Complexity: Medium
- Estimated Hours: 8-10
- Sprint: Week 4
- Dependencies: All previous user stories

---

### US-031: [MEDIUM] Mobile Responsiveness

**As a mobile user, I want the app to work seamlessly on smartphones and tablets so that I can use TapIn on the go**

Acceptance Criteria:

- [ ] All pages render correctly on mobile (375px width minimum)
- [ ] Touch-friendly buttons and inputs (min 44px height)
- [ ] Navigation converts to hamburger menu on mobile
- [ ] Forms are single-column on mobile
- [ ] Images and maps scale responsively
- [ ] No horizontal scrolling
- [ ] Performance is acceptable on 4G (load times <3s)

Technical Notes:

- Frontend: Tailwind CSS responsive classes
- Testing: Chrome DevTools mobile emulation + real device testing
- Complexity: Medium
- Estimated Hours: 8-10
- Sprint: Week 4
- Dependencies: All UI components

---

### US-032: [MEDIUM] Security Audit & Implementation

**As the system owner, I need security best practices implemented so that user data is protected**

Acceptance Criteria:

- [ ] All passwords encrypted with bcrypt (cost factor 10+)
- [ ] JWT tokens use secure signing algorithm (HS256 or RS256)
- [ ] All sensitive data in httpOnly, Secure, SameSite cookies
- [ ] CSRF protection implemented (CSRF tokens for state-changing requests)
- [ ] SQL injection prevention (parameterized queries used throughout)
- [ ] XSS protection (user input sanitized/escaped)
- [ ] Rate limiting on auth endpoints (max 5 attempts per minute)
- [ ] HTTPS only (enforced in production)
- [ ] Environment variables used for secrets (not in code)
- [ ] Database backups automated

Technical Notes:

- Backend: helmet.js middleware for secure headers
- Backend: express-validator for input validation
- Backend: Rate limiting middleware
- Frontend: React sanitize for XSS prevention
- Complexity: High
- Estimated Hours: 10-12
- Sprint: Week 4 (start earlier if possible)
- Dependencies: All previous user stories

---

### US-033: [HIGH] Performance Optimization

**As a user, I want the app to load quickly and respond instantly so that I can use TapIn without frustration**

Acceptance Criteria:

- [ ] Initial page load under 3 seconds (on 4G)
- [ ] API responses under 1 second (90th percentile)
- [ ] Lazy loading for opportunity lists
- [ ] Image optimization (WebP format, compression)
- [ ] Database query optimization (indexes, eager loading)
- [ ] Caching strategy implemented (Redis if needed)
- [ ] Bundle size optimized (code splitting)
- [ ] No console errors or warnings

Technical Notes:

- Frontend: React.lazy() for code splitting
- Frontend: Image optimization tools (ImageOptim, TinyPNG)
- Backend: Database indexing strategy
- Backend: Query profiling
- Complexity: Medium
- Estimated Hours: 8-10
- Sprint: Week 4
- Dependencies: All previous user stories

---

### US-034: [HIGH] Backend Deployment

**As a developer, I want to deploy the backend to production so that the app is accessible to users**

Acceptance Criteria:

- [ ] Backend deployed to production environment (Railway or Render)
- [ ] Production database (PostgreSQL) created and configured
- [ ] Environment variables configured (DATABASE_URL, JWT_SECRET, SENDGRID_KEY)
- [ ] SSL certificate configured
- [ ] Database migrations run successfully
- [ ] Health check endpoint working
- [ ] Logging configured and monitored
- [ ] Automated backups enabled

Technical Notes:

- Deployment: Railway.app or Render.com
- Database: PostgreSQL managed service
- Environment: Node.js v18+ on production
- Monitoring: Basic health checks via endpoint
- Complexity: Medium
- Estimated Hours: 6-8
- Sprint: Week 4 (end of project)
- Dependencies: All backend user stories

---

### US-035: [HIGH] Frontend Deployment

**As a developer, I want to deploy the frontend to production so that users can access the app**

Acceptance Criteria:

- [ ] Frontend deployed to Vercel or similar service
- [ ] Production build created (optimized)
- [ ] Custom domain configured
- [ ] SSL certificate configured
- [ ] Environment variables for production API endpoint configured
- [ ] Performance metrics baseline established
- [ ] Analytics tracking (optional for MVP)
- [ ] Uptime monitoring enabled

Technical Notes:

- Deployment: Vercel (recommended for React)
- Build: `npm run build` generates optimized assets
- Environment: NODE_ENV=production
- API endpoint: Environment variable for production backend URL
- Complexity: Medium
- Estimated Hours: 4-6
- Sprint: Week 4 (end of project)
- Dependencies: All frontend user stories

---

### US-036: [MEDIUM] Comprehensive Testing

**As a developer, I want comprehensive tests so that I can catch bugs before deployment**

Acceptance Criteria:

- [ ] Unit tests for utility functions (>=80% coverage)
- [ ] Integration tests for API endpoints
- [ ] Authentication flow tested (register, login, logout)
- [ ] Matching algorithm tested with sample data
- [ ] CRUD operations tested for all entities
- [ ] Error scenarios tested (400, 404, 500 responses)
- [ ] Test suite passes locally and in CI/CD
- [ ] E2E tests for critical user flows (optional for MVP)

Technical Notes:

- Testing: Jest for unit/integration tests
- Backend: supertest for API endpoint testing
- Frontend: React Testing Library for component tests
- Complexity: High
- Estimated Hours: 12-16
- Sprint: Week 4 (throughout project, but finalized in Week 4)
- Dependencies: All user stories

---

### US-037: [MEDIUM] Documentation & README

**As a new developer, I want comprehensive documentation so that I can understand and contribute to the project**

Acceptance Criteria:

- [ ] README with project overview and features
- [ ] Setup instructions for local development
- [ ] API documentation (endpoints, request/response examples)
- [ ] Database schema diagram or description
- [ ] Architecture overview diagram
- [ ] Deployment instructions
- [ ] Environment variable list
- [ ] Contributing guidelines
- [ ] Known issues and future improvements

Technical Notes:

- Format: Markdown files in repo
- API docs: Swagger/OpenAPI (optional for MVP)
- Diagrams: Lucidchart or draw.io (linked in README)
- Complexity: Medium
- Estimated Hours: 6-8
- Sprint: Week 4 (throughout project)
- Dependencies: All user stories

---

### US-038: [LOW] Future Enhancement - Messaging System

**As a volunteer/organization, I want to send direct messages so that I can communicate about opportunities**

Acceptance Criteria:

- [ ] Simple message interface (not in MVP, planned for future)
- [ ] Messages between volunteer and organization
- [ ] Read/unread status
- [ ] Message history
- [ ] Notifications for new messages

Technical Notes:

- PLANNED FOR: Version 2.0 (after MVP)
- Technology: WebSockets or polling for real-time messaging
- Complexity: High
- Sprint: Future
- Dependencies: Complete MVP first

---

### US-039: [LOW] Future Enhancement - Volunteer Hours Tracking

**As a volunteer, I want to log hours volunteered so that I can track my impact**

Acceptance Criteria:

- [ ] Hour logging interface (planned for future)
- [ ] Organization verification of hours
- [ ] Hours analytics and reports
- [ ] Certificate generation option

Technical Notes:

- PLANNED FOR: Version 2.0
- Complexity: High
- Sprint: Future
- Dependencies: Complete MVP first

---

### US-040: [LOW] Future Enhancement - Ratings & Reviews

**As a volunteer/organization, I want to rate and review experiences so that others can make informed decisions**

Acceptance Criteria:

- [ ] Rating system (1-5 stars)
- [ ] Review comments (optional)
- [ ] Public profile showing average ratings
- [ ] Review moderation (optional)

Technical Notes:

- PLANNED FOR: Version 2.0
- Complexity: Medium
- Sprint: Future
- Dependencies: Complete MVP first

---

## User Story Summary by Sprint

### Sprint 1: Authentication & Foundation (Week 1)

- US-001 to US-008
- Focus: User registration, login, database setup
- **Total Estimated Hours: 40-56 hours**

### Sprint 2: Core CRUD & Profiles (Week 2)

- US-009 to US-017
- Focus: Profile management, opportunity CRUD
- **Total Estimated Hours: 70-92 hours**

### Sprint 3: Matching & Discovery (Week 3)

- US-018 to US-026
- Focus: Matching algorithm, dashboards, filtering
- **Total Estimated Hours: 92-124 hours**

### Sprint 4: Polish, Integration & Deployment (Week 4)

- US-027 to US-037
- Focus: Notifications, testing, deployment, documentation
- **Total Estimated Hours: 68-94 hours**

---

## Implementation Priorities

### CRITICAL (Must have for MVP)

- US-001, US-002, US-003 (Auth)
- US-008 (Database)
- US-009, US-010 (Volunteer Profile)
- US-013 (Create Opportunity)
- US-018 (Matching & Discovery)
- US-019 (Matching Algorithm)
- US-021 (Apply)
- US-023 (Accept/Reject)
- US-034, US-035 (Deployment)

### HIGH (Important, should complete)

- US-004, US-005, US-006, US-007 (Auth & Settings)
- US-012 (Organization Profile)
- US-014, US-015, US-016 (Opportunity Management)
- US-017, US-020, US-022, US-024 (Dashboards)
- US-027, US-028, US-029 (Email Notifications)
- US-032, US-033 (Security & Performance)
- US-036, US-037 (Testing & Documentation)

### MEDIUM (Nice to have)

- US-011 (View Profile)
- US-025, US-026 (Search & Filter)
- US-030, US-031 (UX Polish)

### LOW (Future versions)

- US-038, US-039, US-040 (Future Enhancements)

---

## Notes for Team

1. **Estimation:** Estimates include development + testing but not design time
2. **Dependencies:** Some stories can be worked on in parallel (e.g., frontend and backend)
3. **Work Split Suggestion:**
   - **Developer 1 (Backend):** Authentication, Database, Matching Algorithm, API Endpoints, Deployment
   - **Developer 2 (Frontend):** UI/Navigation, Forms, Dashboards, Testing
4. **Communication:** Sync daily to discuss blockers and adjust priorities
5. **Git Workflow:** Create feature branches for each user story (e.g., `feat/US-001-volunteer-registration`)
6. **Review:** Code review before merging to main branch

---

**Document Version:** 1.0  
**Last Updated:** October 23, 2025  
**Status:** Ready for Sprint Planning
