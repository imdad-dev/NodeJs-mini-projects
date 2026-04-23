# URL Shortener API & Web Interface

A professional, full-stack URL shortening service with user authentication, link management, and real-time click analytics.

## 🚀 Features
- **User Authentication**: Secure signup and login system.
- **URL Shortening**: Convert long URLs into compact, shareable links.
- **Analytics**: Track total clicks for each generated short URL.
- **Protected Dashboard**: View and manage URLs created by the authenticated user.
- **Server-Side Rendering**: Built with Node.js and EJS for fast, dynamic rendering.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **Frontend**: EJS (Embedded JavaScript templates)
- **Architecture**: MVC (Model-View-Controller) Pattern

## 📂 API Reference

### User Routes (`/user`)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| POST   | `/`       | Create a new user account. |
| POST   | `/login`  | Authenticate and log in. |

### URL Operations (`/url`)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| POST   | `/`       | Generate a unique short URL. |
| GET    | `/:shortId`| Redirect to the original long URL. |
| GET    | `/analytics/:shortId`| Fetch visit history and click counts. |

### View Routes (Static)
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| GET    | `/home`   | User dashboard (Requires Login). |
| GET    | `/signup` | Signup page interface. |
| GET    | `/login`  | Login page interface. |

## 📂 Project Structure

```bash
project-root/
├── DB/                # Database connection configuration
├── controller/        # Logic for handling URL and User operations
├── models/            # Mongoose schemas (URL, User)
├── routes/            # Route definitions (URL, User, Static)
├── middleware/        # Authentication and authorization logic
├── views/             # EJS templates for the frontend
├── index.js           # Entry point of the application
└── package.json       # Dependencies and scripts
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/imdad-dev/NodeJs-mini-projects.git
   cd NodeJs-mini-projects/06_URL_Shortner
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the project**

   ```bash
   npm run dev
   ```
