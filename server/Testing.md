# API Testing Examples with cURL

## Authentication Endpoints

### 1. Register New User
```bash
curl -X POST http://localhost:5000/api/user/create-account \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Forget Password
```bash
curl -X POST http://localhost:5000/api/user/USER_ID/forget-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

### 4. Reset Password
```bash
curl -X POST http://localhost:5000/api/user/USER_ID/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "RESET_TOKEN_FROM_EMAIL",
    "password": "newpassword123"
  }'
```

## Social Authentication

### 5. Google Login
```bash
curl -X POST http://localhost:5000/api/auth/continue-with-google \
  -H "Content-Type: application/json" \
  -d '{
    "googleToken": "GOOGLE_OAUTH_TOKEN",
    "profile": {
      "googleId": "123456789",
      "email": "user@gmail.com",
      "name": "John Doe",
      "picture": "https://example.com/photo.jpg"
    }
  }'
```

### 6. GitHub Login
```bash
curl -X POST http://localhost:5000/api/auth/continue-with-github \
  -H "Content-Type: application/json" \
  -d '{
    "githubToken": "GITHUB_OAUTH_TOKEN",
    "profile": {
      "githubId": "987654",
      "email": "user@example.com",
      "login": "johndoe",
      "avatar_url": "https://example.com/avatar.jpg"
    }
  }'
```

## User Profile Endpoints

### 7. Get User Profile (Public)
```bash
curl -X GET http://localhost:5000/api/user/USER_ID/profile
```

### 8. Update User Profile (Protected)
```bash
curl -X PUT http://localhost:5000/api/user/USER_ID/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "username": "newusername",
    "bio": "Software developer",
    "profilePicture": "https://example.com/new-photo.jpg"
  }'
```

## Code Execution Endpoints

### 9. Execute Code (Test Run)
```bash
curl -X POST http://localhost:5000/api/execute-run \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "code": "function solution(input) { return input * 2; }",
    "language": "javascript",
    "questionId": "QUESTION_ID_HERE"
  }'
```

### 10. Submit Code for Evaluation
```bash
curl -X POST http://localhost:5000/api/code-submission \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "code": "function solution(input) { return input * 2; }",
    "language": "javascript",
    "questionId": "QUESTION_ID_HERE"
  }'
```

## Feature Endpoints

### 11. Generate Hints
```bash
curl -X POST http://localhost:5000/api/question-hints-generator \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "questionId": "QUESTION_ID_HERE",
    "context": "Need help with the algorithm"
  }'
```

### 12. Translate Question
```bash
curl -X POST http://localhost:5000/api/question-translate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "questionId": "QUESTION_ID_HERE",
    "targetLanguage": "es"
  }'
```

## Metrics Endpoints

### 13. Get Problems Solved
```bash
curl -X GET http://localhost:5000/api/user/USER_ID/problem-solved \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 14. Get Problem Tracker
```bash
curl -X GET "http://localhost:5000/api/user/USER_ID/problem-tracker?page=1&limit=20&status=Accepted" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 15. Get Submission Details
```bash
curl -X GET http://localhost:5000/api/user/USER_ID/submission/SUBMISSION_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Admin Endpoints (Require Admin Token)

### 16. Generate Problem
```bash
curl -X POST http://localhost:5000/api/admin/question-generate-problem \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -d '{
    "difficulty": "Medium",
    "category": "Arrays",
    "tags": ["sorting", "binary-search"],
    "context": "Create a problem about finding elements"
  }'
```

### 17. Create Question
```bash
curl -X POST http://localhost:5000/api/admin/create-question \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -d '{
    "title": "Two Sum",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    "difficulty": "Easy",
    "category": "Arrays",
    "tags": ["array", "hash-table"],
    "testCases": [
      {
        "input": "[2,7,11,15], 9",
        "expectedOutput": "[0,1]",
        "isHidden": false
      },
      {
        "input": "[3,2,4], 6",
        "expectedOutput": "[1,2]",
        "isHidden": false
      }
    ],
    "timeLimit": 2000,
    "memoryLimit": 128
  }'
```

### 18. Update Question
```bash
curl -X PUT http://localhost:5000/api/admin/question/QUESTION_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -d '{
    "title": "Updated Two Sum",
    "difficulty": "Medium"
  }'
```

### 19. Delete Question
```bash
curl -X DELETE http://localhost:5000/api/admin/question/QUESTION_ID \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

### 20. Get All Questions (Admin)
```bash
curl -X GET "http://localhost:5000/api/admin/questions?page=1&limit=20&difficulty=Medium" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

## Health Check

### Check Server Status
```bash
curl -X GET http://localhost:5000/health
```

## Notes

1. Replace `YOUR_JWT_TOKEN` with the actual JWT token received from login
2. Replace `USER_ID`, `QUESTION_ID`, `SUBMISSION_ID` with actual IDs
3. For admin endpoints, use a token from a user with admin role
4. Add `-v` flag to any curl command for verbose output
5. Add `-i` flag to see response headers

## Example: Complete Flow

### Step 1: Register
```bash
curl -X POST http://localhost:5000/api/user/create-account \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "test123456"
  }'
```

### Step 2: Save the token from response
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Step 3: Use token for authenticated requests
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET http://localhost:5000/api/user/USER_ID/problem-solved \
  -H "Authorization: Bearer $TOKEN"
```