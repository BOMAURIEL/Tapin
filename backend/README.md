# TapIn Backend API

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database

**Option A: Use Neon (Cloud PostgreSQL - Recommended)**
1. Go to https://neon.tech
2. Create free account
3. Create new project "tapin"
4. Copy connection string
5. Paste into `.env` file as `DATABASE_URL`

**Option B: Local PostgreSQL**
```bash
# Install PostgreSQL (Mac)
brew install postgresql

# Start PostgreSQL
brew services start postgresql

# Create database
creatdb tapin_db

# Run schema
psql tapin_db < database/schema.sql
```

### 3. Configure Environment Variables

Edit `.env` file with your actual credentials:
```
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_random_secret_key
```

### 4. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on http://localhost:5000

## API Endpoints

### Authentication

**Register Volunteer**
```
POST /api/auth/register/volunteer
Body: {
  "email": "volunteer@example.com",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Register Organization**
```
POST /api/auth/register/organization
Body: {
  "email": "org@example.com",
  "password": "Password123!",
  "organizationName": "My Organization"
}
```

**Login**
```
POST /api/auth/login
Body: {
  "email": "user@example.com",
  "password": "Password123!"
}
```

## Testing with curl

```bash
# Health check
curl http://localhost:5000/health

# Register volunteer
curl -X POST http://localhost:5000/api/auth/register/volunteer \
  -H "Content-Type: application/json" \
  -d '{"email":"test@volunteer.com","password":"Test123!","firstName":"Test","lastName":"User"}'
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js      # Database connection
│   ├── controllers/
│   │   └── authController.js # Authentication logic
│   ├── models/
│   │   └── User.js          # User model
│   ├── routes/
│   │   └── auth.js          # Auth routes
│   ├── middleware/          # Custom middleware (future)
│   └── server.js            # Express app entry point
├── database/
│   └── schema.sql           # Database schema
├── .env                     # Environment variables
└── package.json
```
