# 🐾 Pet Clinic App

Welcome to the **Pet Clinic App**, a comprehensive full-stack application built with Next.js, Tailwind CSS, Node.js, and MongoDB. Designed to streamline pet clinic operations, this app offers seamless appointment scheduling, pet management, user authentication, and reminders.

---

## 🌟 Features

- **User Authentication:** Secure admin and pet owner logins.
- **Appointment Scheduling:** Easy creation, viewing, and management of appointments.
- **Pet Profiles:** Detailed profiles including photo uploads.
- **Calendar Integration:** Visual calendar for appointment tracking.
- **Email Reminders:** Automatic notifications for upcoming appointments.
- **Responsive UI:** Intuitive and user-friendly interface across all devices.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js**
- **Tailwind CSS**
- **React Icons**
- **Axios**

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **JWT Authentication**
- **Nodemailer (Email Integration)**

---

## 📂 Project Structure

```
pet-clinic-app/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── styles/
│   └── public/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/pet-clinic-app.git
cd pet-clinic-app
npm install
```

Setup environment variables:

- **Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

- **Backend** (`backend/.env`):
```env
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_HOST=your_email_service_host
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

### Running the App

- **Frontend:**
```bash
cd frontend
npm run dev
```

- **Backend:**
```bash
cd backend
npm run server
```

Access the application via [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing

Run frontend and backend tests separately:

```bash
npm test
```

---

## 🛡️ Security

- **JWT-Based Authentication**
- **Secure Middleware**

---
*

---


✨ **Happy coding and caring for pets!** 🐶🐱✨

