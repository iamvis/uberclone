# /users/register Endpoint Documentation

## **Description**
The `/users/register` endpoint is used to register a new user in the system. It accepts user details such as their first name, last name, email, and password, validates the input, hashes the password, and creates the user in the database. Upon successful registration, it generates a token and returns it along with the created user's information.

---

## **Endpoint**
**URL:** `/users/register`  
**Method:** `POST`

---

## **Request Body**
The following fields must be included in the request body:

### **Required Fields**
| Field                   | Type     | Description                              |
|-------------------------|----------|------------------------------------------|
| `fullname.firstname`    | `string` | User's first name (minimum 3 characters).|
| `fullname.lastname`     | `string` | User's last name (optional).             |
| `email`                 | `string` | User's valid email address.              |
| `password`              | `string` | User's password (minimum 6 characters).  |

#### **Example Request**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

---

## **Validation Rules**
- `fullname.firstname`: Must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

If any validation fails, a `400 Bad Request` response is returned with the validation errors.

---

## **Responses**

### **Success Response**
| Status Code | Description                    |
|-------------|--------------------------------|
| `201`       | User created successfully.     |

#### Example Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "63a1234567890abc12345def",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### **Error Responses**
| Status Code | Description                             |
|-------------|-----------------------------------------|
| `400`       | Validation failed with error details.   |
| `500`       | Internal server error.                 |

#### Example Validation Error Response:
```json
{
  "errors": [
    { "msg": "firstname is required at least 3 characters", "param": "fullname.firstname" },
    { "msg": "Invalid email", "param": "email" }
  ]
}
```

---

## **Internal Logic Overview**
1. **Validation:**
   - Input data is validated using `express-validator`.
   - If validation fails, a `400` error with detailed messages is returned.

2. **Password Hashing:**
   - The password is securely hashed before being saved.

3. **User Creation:**
   - A new user is created in the database using the `createUser` service.

4. **Token Generation:**
   - A JWT token is generated for the user.

---

## **Setup Instructions**
Ensure the following:
- The `JWT_SECRET` is configured in your environment variables.
- Required dependencies (`express`, `express-validator`, `bcrypt`, etc.) are installed.

---

## **Dependencies**
- `express`
- `express-validator`
- `bcrypt`
- `jsonwebtoken`
- `mongoose`

# /users/login Endpoint Documentation

## Description
The `/users/login` endpoint allows users to log in by providing their email and password. It validates the input data and returns an authentication token if the login is successful.

---

## Endpoint
`POST /users/login`

---

## Request

### Headers
- `Content-Type: application/json`

### Body (JSON)
The request body must include the following fields:

| Field    | Type   | Required | Description                     |
|----------|--------|----------|---------------------------------|
| `email`  | String | Yes      | The user's email address.       |
| `password`| String| Yes      | The user's password (min. 6).   |

#### Example Request Body:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

---

## Response

### Success Response
- **Status Code:** `200 OK`
- **Content:** JSON object containing the authentication token and user data.

#### Example:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64d43ebf5e6a",
    "email": "user@example.com",
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

### Error Responses

| Status Code | Description                         |
|-------------|-------------------------------------|
| `400`       | Validation errors in input fields.  |
| `401`       | Invalid email or password.          |

#### Example Error Responses:
1. **Validation Error (400):**
   ```json
   {
     "errors": [
       {
         "msg": "Invalid Email",
         "param": "email",
         "location": "body"
       }
     ]
   }
   ```

2. **Authentication Failure (401):**
   ```json
   {
     "message": "Invalid Email or Password"
   }
   ```

---

## Implementation Details

### Validation
The following validations are performed on the request body:
1. `email` must be a valid email address.
2. `password` must be at least 6 characters long.

### Logic
1. Validate the input using `express-validator`.
2. Check if a user with the provided email exists in the database.
3. If the user exists, compare the provided password with the stored (hashed) password.
4. If the password matches, generate and return a JWT token along with user details.
5. If any step fails, return the appropriate error response.

---

## Files
This endpoint is implemented in the following files:
- **Route Definition:** `routes/user.route.js`
- **Controller Logic:** `controllers/user.controller.js`
- **Model Definition:** `models/user.model.js`

---

## Notes
- The endpoint requires the password field to be explicitly included in the query using `.select('+password')`.
- Password comparison is done using a method like `comparePassword` defined in the user model.

# /users/profile Endpoint Documentation

## **Description**
This document outlines the details for the `/users/profile` endpoint.

---

## **/users/profile**

### **URL**: `/users/profile`  
### **Method**: `GET`

### **Description**:
The `/users/profile` endpoint retrieves the profile information of the authenticated user.

### **Headers**
| Header            | Type     | Description                              |
|-------------------|----------|------------------------------------------|
| `Authorization`   | `string` | Bearer token or token in cookies.       |

### **Validation**:
Authentication is required using the token in the request headers or cookies.

### **Success Response**:
| Status Code | Description               |
|-------------|---------------------------|
| `200`       | User profile retrieved.   |

#### Example Response:
```json
{
  "_id": "63a1234567890abc12345def",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

### **Error Response**:
| Status Code | Description                  |
|-------------|------------------------------|
| `401`       | Unauthorized or token invalid. |

#### Example Error Response:
```json
{
  "message": "Unauthorized"
}
```

---

## **Internal Logic Overview**
- The token is extracted from cookies or the `Authorization` header.
- The token is verified, and the corresponding user is fetched from the database.
- The middleware `authUser` ensures only authenticated users can access this endpoint.

---

## **Setup Instructions**
Ensure the following:
- The `JWT_SECRET` is configured in your environment variables.
- Required dependencies (`express`, `jsonwebtoken`, `mongoose`, etc.) are installed.

---

## **Dependencies**
- `express`
- `jsonwebtoken`
- `mongoose`
- `cookie-parser` (for managing cookies)


# /users/logout Endpoint Documentation

## **Overview**
The `/users/logout` endpoint allows authenticated users to log out by clearing their session token from cookies and blacklisting it to prevent further use.

---

## **Endpoint Details**

### **URL**: `/users/logout`
### **Method**: `GET`

### **Headers**
| Header            | Type     | Description                              |
|-------------------|----------|------------------------------------------|
| `Authorization`   | `string` | Bearer token (optional if using cookies).|

### **Authentication**
- A valid token is required, either from cookies or passed as a Bearer token in the `Authorization` header.

### **Success Response**:
| Status Code | Description                  |
|-------------|------------------------------|
| `200`       | User successfully logged out.|

#### **Example Response**:
```json
{
  "message": "Logged out"
}
```

### **Error Responses**:
| Status Code | Description                       |
|-------------|-----------------------------------|
| `401`       | Unauthorized or invalid token.    |

#### **Example Error Response**:
```json
{
  "message": "Unauthorized"
}
```

---

## **Implementation Details**

1. **Clearing Cookies**:
   - The token is removed from the user's cookies, effectively ending their session.

2. **Blacklisting Tokens**:
   - The token is added to a `BlacklistToken` collection in the database.
   - Blacklisted tokens are automatically expired after 24 hours.

3. **Middleware**:
   - The `authUser` middleware validates the user’s token before allowing access to the endpoint.

---

## **Setup Requirements**
To use this endpoint:
- Ensure `JWT_SECRET` is defined in your environment variables.
- Install the following dependencies:
  - `express` for handling HTTP requests.
  - `jsonwebtoken` for token generation and verification.
  - `mongoose` for database interaction.
  - `cookie-parser` for managing cookies.
- Implement the `BlacklistToken` schema in the database to store blacklisted tokens:

```javascript
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);
```

---


