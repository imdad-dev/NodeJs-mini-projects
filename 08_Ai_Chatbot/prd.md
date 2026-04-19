# 🤖 AI ChatBot — Product Requirements Document

> **Stack:** Node.js · Express.js · MongoDB · EJS · CSS3 · Vanilla JS · Anthropic Claude API  
> **Theme:** Modern dark UI 

---

## 📌 Project Overview

A full-stack AI-powered chatbot web app where users can register, log in, and have real conversations with Claude AI. All conversations are saved per user in MongoDB. Built with a clean MVC-style architecture.

---

## 🗂️ Folder Structure

```
ai-chatbot/
│
├── public/                        # Static files served to browser
│   ├── css/
│   │   └── style.css              # All styling (dark theme, modern UI)
│   └── js/
│       └── chat.js                # Frontend JS (fetch API, UI interactions)
│
├── src/                           # All server-side logic
│   ├── controllers/
│   │   ├── authController.js      # Register / Login / Logout logic
│   │   └── chatController.js      # Chat CRUD + AI message handling
│   │
│   ├── models/
│   │   ├── User.js                # MongoDB User schema
│   │   └── Conversation.js        # MongoDB Conversation + Message schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js          # Auth route definitions
│   │   └── chatRoutes.js          # Chat route definitions
│   │
│   ├── utils/
│   │   ├── aiHelper.js            # Anthropic API call wrapper
│   │   └── authMiddleware.js      # isLoggedIn route guard
│   │
│   └── app.js                     # Express app setup (middleware, routes)
│
├── views/                         # EJS templates (server-rendered HTML)
│   ├── partials/
│   │   ├── header.ejs             # Common <head> + nav
│   │   └── footer.ejs             # Common scripts closing tags
│   ├── index.ejs                  # Landing / home page
│   ├── login.ejs                  # Login form
│   ├── register.ejs               # Register form
│   └── chat.ejs                   # Main chat UI (sidebar + chat window)
│
├── index.js                       # Entry point — starts server
├── .env                           # Secret keys (never commit this!)
├── .gitignore                     # Ignore node_modules, .env
└── package.json                   # Project metadata + dependencies
```

---

## ✨ Core Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | 🔐 **User Authentication** | Register & login with hashed passwords using bcrypt |
| 2 | 🛡️ **Session Management** | express-session keeps users logged in across pages |
| 3 | 🤖 **AI Chat (Claude API)** | Real AI replies via Anthropic Claude API |
| 4 | 💾 **Chat History** | All messages saved in MongoDB per user |
| 5 | 📂 **Multi-Conversation** | Create new chats, switch between old ones |
| 6 | 🗑️ **Delete Conversation** | Remove any conversation permanently |
| 7 | 🔒 **Route Protection** | Middleware blocks unauthenticated access to /chat |
| 8 | 🎨 **Modern Dark UI** | ChatGPT-style sidebar layout, smooth animations |
| 9 | 📱 **Responsive Design** | Works on desktop and mobile screens |
| 10 | ⚡ **Async UX** | Messages sent via fetch (no page reload) |

---

## 🛣️ Routes

### Auth Routes — `/auth`

| Method | Route | Controller Function | Description |
|--------|-------|-------------------|-------------|
| `GET` | `/auth/register` | `showRegister` | Render registration form |
| `POST` | `/auth/register` | `registerUser` | Validate input → hash password → save user → redirect to login |
| `GET` | `/auth/login` | `showLogin` | Render login form |
| `POST` | `/auth/login` | `loginUser` | Check credentials → start session → redirect to /chat |
| `GET` | `/auth/logout` | `logoutUser` | Destroy session → redirect to /auth/login |

### Chat Routes — `/chat`

| Method | Route | Controller Function | Description |
|--------|-------|-------------------|-------------|
| `GET` | `/chat` | `getChatDashboard` | Load all user's conversations → render chat.ejs |
| `POST` | `/chat/new` | `createConversation` | Create new empty conversation → redirect to it |
| `GET` | `/chat/:id` | `getConversation` | Load specific conversation with all messages |
| `POST` | `/chat/:id/message` | `sendMessage` | Save user msg → call AI → save AI reply → return JSON |
| `DELETE` | `/chat/:id` | `deleteConversation` | Delete conversation + all messages → return success JSON |

### Home Route

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/` | Landing page — redirects to `/chat` if logged in, else shows welcome page |

---

## 🗃️ Database Models

### User Model (`User.js`)

```
User {
  username    : String  (required, unique, min 3 chars)
  email       : String  (required, unique, lowercase)
  password    : String  (required, hashed with bcrypt)
  createdAt   : Date    (auto)
}
```

### Conversation Model (`Conversation.js`)

```
Conversation {
  userId      : ObjectId  (ref → User)
  title       : String    (auto-generated from first message)
  messages    : [
    {
      role    : String  ("user" | "assistant")
      content : String
      timestamp : Date
    }
  ]
  createdAt   : Date
  updatedAt   : Date
}
```

---

## 📦 Dependencies

### Production

```json
{
  "express"           : "^4.18.x",   // Web framework
  "mongoose"          : "^8.x.x",    // MongoDB ODM
  "ejs"               : "^3.1.x",    // Templating engine
  "bcryptjs"          : "^2.4.x",    // Password hashing
  "express-session"   : "^1.17.x",   // Session management
  "dotenv"            : "^16.x.x",   // Environment variables
  "@anthropic-ai/sdk" : "^0.20.x"    // Claude AI API
}
```

### Development

```json
{
  "nodemon" : "^3.x.x"   // Auto-restart on file change
}
```

---

## 🔑 Environment Variables (`.env`)

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ai-chatbot
SESSION_SECRET=your_super_secret_key_here
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

---

## 🧱 Middleware Stack (in `app.js`)

```
1. express.json()           → Parse JSON request bodies
2. express.urlencoded()     → Parse form data
3. express.static()         → Serve public/ folder
4. express-session()        → Session handling
5. app.set('view engine')   → Set EJS as template engine
6. authRoutes               → /auth/* routes
7. chatRoutes               → /chat/* routes
```

---

## 🚀 Task Roadmap (Build Order)

| Task | What we build | Commit |
|------|--------------|--------|
| ✅ **Task 1** | Project setup, folder structure, install dependencies | `feat: initialize project structure` |
| ⬜ **Task 2** | MongoDB connection + `.env` config | `feat: add database connection` |
| ⬜ **Task 3** | User model + Auth controller | `feat: add user model and auth controller` |
| ⬜ **Task 4** | Auth routes + Login/Register EJS views | `feat: add auth routes and views` |
| ⬜ **Task 5** | Auth middleware (route protection) | `feat: add auth middleware` |
| ⬜ **Task 6** | Conversation model | `feat: add conversation model` |
| ⬜ **Task 7** | Chat controller + AI helper | `feat: add chat controller and AI integration` |
| ⬜ **Task 8** | Chat routes | `feat: add chat routes` |
| ⬜ **Task 9** | Chat EJS view (main UI) | `feat: add chat UI template` |
| ⬜ **Task 10** | Public CSS (dark theme) | `feat: add modern dark theme styles` |
| ⬜ **Task 11** | Public JS (fetch + interactions) | `feat: add frontend chat interactions` |

---

## 🔐 Security Checklist

- [x] Passwords hashed with `bcryptjs` (never stored plain)
- [x] `.env` in `.gitignore` (API keys never exposed)
- [x] Session secret stored in environment variable
- [x] Auth middleware protects all `/chat` routes
- [ ] Input validation on register/login forms *(stretch goal)*
- [ ] Rate limiting on `/chat/:id/message` *(stretch goal)*

---

## 💡 Stretch Goals (After Core Build)

| Feature | Description |
|---------|-------------|
| 🌙 Light/Dark toggle | CSS variable-based theme switcher |
| ✏️ Rename conversation | Click title to rename inline |
| 📤 Export chat | Download conversation as `.txt` or `.md` |
| 🔍 Search history | Filter past conversations by keyword |
| 🧠 System prompt | Let user set a custom AI personality |
| 📊 Usage stats | Show message count per conversation |

                                  ---