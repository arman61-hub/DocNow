# 🏥 DocNow – Complete Healthcare Appointment & Prescription System 🚀

**DocNow** is a modern, full-stack healthcare management application that streamlines doctor appointments, digital prescriptions, and secure payments. Built with a modular architecture consisting of a **React-based frontend**, a powerful **admin dashboard**, and a secure **Node.js/Express backend**, DocNow provides a seamless experience for patients, doctors, and administrators alike.

---

## 🌐 Live Demo 
> 🔗 [DocNow](https://docnow-sr1f.onrender.com/)

---

## 📚 Table of Contents
- [✨ Features](#-features)
- [📦 Project Structure](#-project-structure)
- [🛠 Technologies Used](#-technologies-used)
- [🚀 Installation](#-installation)
- [🕹 Usage Guide](#-usage-guide)
- [📢 API Endpoints (Backend)](#-api-endpoints-backend)
- [🤝 Contributing](#-contributing)
- [📄 Motivation](#-motivation)

---

## ✨ Features

### 🔐 Authentication & Access
- Secure JWT-based login/registration for Patients, Doctors, and Admins
- Role-based access control

### 👨‍⚕️ Doctor & Appointment Management
- Add, update, or remove doctor profiles
- Book, reschedule, or cancel appointments
- View doctor directory and availability

### 💊 Digital Prescriptions
- Doctors issue and manage prescriptions digitally
- Patients can view prescription history

### 💳 Secure Payments
- Razorpay integration for handling consultation payments
- Admins can track all transactions

### 📊 Admin Panel
- Monitor all appointments, doctors, and users
- View analytics reports and payment history

---

## 📦 Project Structure
```
📁 DocNow/
├── 📁 backend/
│   ├── 📁 config/
│   │   ├── cloudinary.js
│   │   └── mongodb.js
│   ├── 📁 controllers/
│   │   ├── adminController.js
│   │   ├── doctorController.js
│   │   └── userController.js
│   ├── 📁 middlewares/
│   │   ├── authAdmin.js
│   │   ├── authDoctor.js
│   │   ├── authUser.js
│   │   └── multer.js
│   ├── 📁 models/
│   │   ├── appointmentModel.js
│   │   ├── doctorModel.js
│   │   └── userModel.js
│   ├── 📁 routes/
│   │   ├── adminRoute.js
│   │   ├── doctorRoute.js
│   │   └── userRoute.js
│   ├── .env
│   └── server.js
│
├── 📁 frontend/
│   ├── 📁 public/
│   │   └── favicon.svg
│   ├── 📁 src/
│   │   ├── 📁 admin/
│   │   │   ├── 📁 assets/
│   │   │   ├── 📁 components/
│   │   │   ├── 📁 context/
│   │   │   └── 📁 pages/
│   │   ├── 📁 assets/
│   │   ├── 📁 components/
│   │   ├── 📁 context/
│   │   ├── 📁 pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   └── index.html
└── README.md
```

---

## 🛠 Technologies Used

### 🔧 Backend
- Node.js, Express.js
- MongoDB + Mongoose
- Cloudinary
- JWT Authentication
- Multer
- Razorpay (Payments)

### 🎨 Frontend & Admin Panel
- React.js
- Tailwind CSS 
- React Router DOM
- Axios
- lucide-react
- react-toastify
- Razorpay Checkout

---

## 🚀 Installation

### 🔧 1. Clone the Repository
```bash
git clone https://github.com/arman61-hub/DocNow.git
cd DocNow
```
### ⚙️ 2. Backend Setup (inside /server)
```bash
cd backend
npm install
```
Create a .env file and add:
```bash
MONGODB_URI = ''
CLOUDINARY_NAME = ''
CLOUDINARY_API_KEY = ''
CLOUDINARY_SECRET_KEY = '' 
ADMIN_EMAIL = ''
ADMIN_PASSWORD = ''
JWT_SECRET = ''
RAZORPAY_KEY_ID = ''   
RAZORPAY_KEY_SECRET = '' 
CURRENCY = ''
```
Start the backend server:
```bash
npm run server
```
### 💻 3. Frontend Setup (inside /client)
```bash
cd ../frontend
npm install
```
Set up environment:
```bash
VITE_BACKEND_URL = ''
VITE_RAZORPAY_KEY_ID = ''
VITE_CURRENCY = ''
```
Start the frontend:
```bash
npm run dev
```

## 🕹 Usage Guide

### 👤 Patients
- Register/Login
- Browse doctors
- Book/reschedule appointments
- Pay securely via Razorpay

### 👨‍⚕️ Doctors
- Login with doctor credentials
- Manage profile
- Issue prescriptions
- View appointment schedules

### 🔐 Admins
- Secure login
- Add/remove doctors
- View/manage all appointments & prescriptions
- Track payments & platform analytics

---

## ⚙️ API Endpoints (Backend)

### 🔑 Authentication
- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Login & receive a JWT token  

### 👨‍⚕️ Doctor Management
- `GET /api/doctors` – Fetch all doctors  
- `GET /api/doctors/:id` – Get doctor details  
- `POST /api/doctors` – Add a doctor (Admin)  
- `PUT /api/doctors/:id` – Update doctor info (Admin)  
- `DELETE /api/doctors/:id` – Remove a doctor (Admin)  

### 📅 Appointments
- `POST /api/appointments` – Book an appointment  
- `GET /api/appointments/:id` – Get appointment details  
- `PUT /api/appointments/:id` – Reschedule/cancel an appointment  

### 💳 Payments
- `POST /api/payments` – Process payments via Razorpay  
- `GET /api/payments/:id` – Get payment status  

📌 More endpoints available in API documentation.

---

## 🤝 Contributing

We welcome contributions to improve **DocNow**!

### 🧩 How to Contribute

#### 1. Fork the Repository  
   Click the **Fork** button on the top right of this page.

#### 2. Clone Your Fork 
   Open terminal and run:
   ```bash
   git clone https://github.com/yourusername/DocNow.git
   cd DocNow
   ```

#### 3. Create a feature branch:
   Use a clear naming convention:
   ```bash
   git checkout -b feature/new-feature
   ```
   
#### 4. Make & Commit Your Changes
   Write clean, documented code and commit:
   ```bash
   git add .
   git commit -m "✨ Added: your change description"
   ```
   
#### 5. Push to GitHub & Submit PR
   ```bash
   git push origin feature/your-feature-name
   ```
#### 6. Then go to your forked repo on GitHub and open a Pull Request.

---

## ⭐ Motivation

> 💡**PS:** If you found this project helpful or inspiring, please **[⭐ star the repository](https://github.com/arman61-hub/DocNow)** — it keeps me motivated to build and share more awesome projects like this one!
---