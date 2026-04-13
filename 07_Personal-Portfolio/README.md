#  Personal Portfolio

A modern, dynamic, and professional full-stack portfolio website built with **Node.js**, **Express.js**, and **MongoDB**. It features an admin panel to easily manage projects and skills. 


## 🚀 Live Demo
<!-- add later -->

## ✨ Features

- **Modern & Responsive Design** – Built with Bootstrap 5
- **Dynamic Content** – Projects and Skills managed via MongoDB
- **Secure Admin Panel** – Protected with JWT authentication
- **Contact Form** – Working email integration using Nodemailer
- **Premium UI/UX** – Smooth animations, hover effects, and clean layout
- **SEO Optimized** – Proper meta tags and structured content
- **Fully Responsive** – Works perfectly on mobile, tablet, and desktop

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript
- EJS (Embedded JavaScript Templating)
- Bootstrap 5
- Custom CSS with modern animations

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- Cookie Parser

**Other Tools:**
- Nodemailer (Contact Form)
- dotenv (Environment Variables)

## 🔑 Admin Access

- **URL**: `/login`
- **Username**: `admin`
- **Password**: `admin123`

**After login, you can:**
- Add / Delete Projects
- Add / Delete Skills

## 📁 Project Structure

```bash
personal-portfolio/
├── models/             # MongoDB Schemas (Project, Skill, User)
├── views/
│   ├── partials/       # Reusable components (head, navbar, footer)
│   ├── admin/          # Admin panel pages
│   ├── home.ejs
│   ├── about.ejs
│   ├── projects.ejs
│   ├── skills.ejs
│   ├── contact.ejs
│   └── login.ejs
├── public/
│   ├── css/            # Bootstrap + custom.css
│   ├── js/             # Custom animations
│   └── images/         # Profile photo, project images, favicon
├── routes/             # Route files (for future expansion)
├── .env                # Environment variables (not committed)
├── app.js              # Main Express application
├── index.js            # Server entry point
├── package.json
└── README.md


## 🏃‍♂️ How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personal-portfolio.git
   cd personal-portfolio

2. **Install dependencies**
     npm install

3.**Setup Environment Variables**
   Create a .env file in the root folder:

PORT=8000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_strong_secret_key_here
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_password

4. **Start MongoDB**
Make sure MongoDB is running locally (mongod command).
 
5. **Run the application**
  npm start

6. Open your browser and go to http://localhost:8000