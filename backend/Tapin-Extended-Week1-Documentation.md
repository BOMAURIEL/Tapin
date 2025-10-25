# TapIn Project – Extended User Stories Documentation

## Week 1 – Authentication and Core Setup

### US‑001 — *User Registration (Volunteer)*
**Goal:** Allow volunteers to create an account using email and password.
**Acceptance Criteria:**
- Form validates email and password using regex rules.
- Password encryption implemented with bcrypt.
- Duplicate email returns validation error.
- Successful registration redirects to volunteer profile setup.
**Checkpoints:**
- [ ] Component UI completed
- [ ] API endpoint tested via Postman
- [ ] Database entry verified
- [ ] Registration flow script merged

### US‑002 — *User Registration (Organization)*
**Goal:** Allow organizations to register to post volunteer opportunities.
**Acceptance Criteria:**
- Organization form requires name, email, secure password.
- Password stored as hash in DB.
- Proper routing to dashboard after registration.
**Checkpoints:**
- [ ] Backend route created and tested
- [ ] Database record confirmed
- [ ] JWT authentication successful
- [ ] API documentation updated

### US‑003 — *User Login (All Users)*
**Goal:** Provide login functionality for volunteers and organizations.
**Acceptance Criteria:**
- Login validates correct credentials.
- JWT returned and stored.
- Incorrect credentials return 401 with helpful message.
- User redirected to correct dashboard type.
**Checkpoints:**
- [ ] Successful login confirmed via Postman
- [ ] JWT token verified manually
- [ ] Cookie/session behaviour confirmed
- [ ] Frontend login screen functional

### US‑004 — *Password Reset*
**Goal:** Users can securely reset forgotten passwords.
**Acceptance Criteria:**
- Request triggers email link.
- Link token expires in 15 minutes.
- New password validation and confirmation required.
**Checkpoints:**
- [ ] Token system implemented
- [ ] Email notifications functioning with SendGrid
- [ ] Reset route functional
- [ ] Form verified end‑to‑end

### US‑005 — *User Logout*
**Goal:** Securely end a user’s session.
**Acceptance Criteria:**
- JWT invalidated client‑side.
- Redirect to login confirmation screen.
**Checkpoints:**
- [ ] Logout button functional
- [ ] Token cleared from storage
- [ ] Frontend redirect passes QA

### US‑006 — *Basic Navigation Layout*
**Goal:** Create a global navigation for both roles.
**Acceptance Criteria:**
- Header links adjust by auth state.
- Routes protected via React Router middleware.
**Checkpoints:**
- [ ] Header layout built (volunteer/org views)
- [ ] ProtectedRoute logic tested

### US‑007 — *Account Settings Page*
**Goal:** Enable profile editing and password change.
**Acceptance Criteria:**
- Form shows persisted user data on load.
- Password updates trigger re‑login.
**Checkpoints:**
- [ ] Backend patch route confirmed
- [ ] Form validation verified
- [ ] Data saves to DB

### US‑008 — *Database Schema Implementation*
**Goal:** Deliver a solid schema for scalable backend operations.
**Acceptance Criteria:**
- PostgreSQL schema successfully deployed to Neon.
- Indices created for email and foreign keys.
**Checkpoints:**
- [ ] Schema file reviewed by team
- [ ] Migrations tested
- [ ] Initial data seeded successfully

---

## Documentation Notes

This file provides internal checkpoints meant for developer demos and sprint grading. Each checkpoint corresponds with issue labels in GitHub to ensure consistent progress tracking.

**Next Artifact:** *Week 2 – Profiles & Opportunities* → generated after completion of Week 1 testing and merge.
