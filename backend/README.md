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
