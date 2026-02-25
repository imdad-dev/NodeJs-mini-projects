# Simple RESTful API - Learning Project

A beginner-friendly REST API to understand and practice the main HTTP methods:

- **GET** → Read / List resources
- **POST** → Create new resource
- **PUT** → Update (replace) existing resource
- **DELETE** → Remove resource

Perfect for learning REST principles and testing with **Postman**

## Features

- In-memory data storage 
- CRUD operations on "users" 
- Proper HTTP status codes
- Basic input validation
- Clear error messages
- Ready-to-test collection for Postman



## API Endpoints

| Method | Route            | What it does              |
|--------|------------------|---------------------------|
| GET    | `/api/users`     | Show all users            |
| GET    | `/api/users/:id` | Show one user by ID       |
| POST   | `/api/users`     | Create a new user         |
| PUT    | `/api/users/:id` | Replace / update user     |
| DELETE | `/api/users/:id` | Delete a user             |

**Example User object**
```json
{
  "id": 3,
  "fullName": "Priya Sen",
  "email": "priya.sen@gmail.com",
  "gender": "female",
  "avatar": "https://example.com/avatars/priya.jpg",
  "createdAt": "2025-02-26T09:15:22.000Z"
}