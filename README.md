🌱 Habit Tracker Web Application
🚀 Build Better Habits. Track Progress. Stay Consistent.

A full‑stack MERN productivity application that helps users create, manage, and monitor daily habits with secure authentication and progress tracking.

🌍 Live Demo
Frontend (Vercel): https://habit-tracker-ha68eitqw-nishas-projects-35b10472.vercel.app/login
Backend (Render): https://habit-tracker-y069.onrender.com

📌 Project Overview
The Habit Tracker App allows users to:

🔐 Register & Login securely

➕ Create and manage daily habits

✅ Track completion status

📈 Monitor consistency & streaks

🗓 Improve productivity over time

This project demonstrates full‑stack architecture, authentication flow, REST APIs, and production deployment practices.

🛠 Tech Stack
🔹 Frontend
React.js (Vite)

Tailwind CSS

Axios

React Router DOM

🔹 Backend
Node.js

Express.js

MongoDB Atlas

Mongoose

JWT Authentication

bcrypt

🔹 Deployment
Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

⚙ Setup Instructions
🔹 Clone Repository
git clone https://github.com/Nisha10-18/Habit-Tracker.git
cd Habit-Tracker
🔹 Backend Setup
cd server
npm install
Create a .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Run backend:

npm start
🔹 Frontend Setup
cd client
npm install
npm run dev
Update Axios baseURL:

baseURL: "https://your-backend-link.onrender.com/api"
🗂 Data Model / Schema
🔹 User Schema
{
  name: String,
  email: String,
  password: String, // hashed
  createdAt: Date
}
🔹 Habit Schema
{
  userId: ObjectId,
  title: String,
  description: String,
  completedDates: [Date],
  createdAt: Date
}
📊 Analytics Logic
The application calculates:

Total habits created

Total completed habits

Daily completion count

Streak tracking

Streak Logic:
Compare today’s date with last completed date

If difference = 1 day → increase streak

Else → reset streak

⚖ Assumptions & Design Decisions
JWT stored in localStorage for simplicity

Backend deployed separately for scalability

MongoDB Atlas used for cloud database

RESTful API structure followed

CORS enabled for cross‑origin requests

Minimal, clean UI for better usability

🎨 UI Wireframe (Basic Structure)
-------------------------------------------------
| Navbar | Habit Tracker | Logout              |
-------------------------------------------------

| Habit Input Field          | + Add Button   |

-------------------------------------------------
| Habit Card                                   |
| Title: Read Book                             |
| [Mark Complete]     [Delete]                 |
-------------------------------------------------
🚀 Key Learning Outcomes
Full‑stack MERN architecture

Secure authentication using JWT

REST API integration

Deployment workflow (Vercel + Render)

Environment variable handling

CORS debugging

👩‍💻 Developed By
Nisha Mishra
Full‑Stack Developer (MERN)
