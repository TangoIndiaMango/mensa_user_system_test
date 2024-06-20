# User Management System

This is a user management system built with Node.js, TypeScript, Express, and MongoDB. It allows administrators to manage users and users to create and read blog posts. The system includes authentication and authorization mechanisms to ensure only authorized users can access specific routes.

## Features

- User roles: admin and user
- User management for admins (create, read, update, delete)
- User profile management for users (read, update)
- Blog post management for users (create, read)
- Authentication with username and password
- Authorization with JSON Web Tokens (JWT)
- MongoDB for data storage

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/user-management-system.git
```

2. Install dependencies:

```bash
cd user-management-system
npm install
```

3. Create a `.env` file and add your MongoDB URI:

```bash
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

4. Start the server:
```bash
npm run dev
```

The server will start running on `http://localhost:5000`.

## API Documentation

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in and obtain a JWT token

### Users (Admin only)

- `GET /api/users`: Get all users
- `GET /api/users/:userId`: Get a user by ID
- `POST /api/users`: Create a new user
- `PUT /api/users/:userId`: Update a user
- `DELETE /api/users/:userId`: Delete a user

### Blogs

- `GET /api/blogs`: Get all blog posts
- `POST /api/blogs`: Create a new blog post (authenticated users only)

## Testing

To run the tests, use the following command:
```bash
npm test
```

### Testing the API

1. **Import Postman Collection**

    - Open Postman.
    - Import the provided Postman collection (usually a `.json` file).
    - The collection contains pre-configured requests to test your API endpoints.