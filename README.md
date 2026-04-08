# Job Portal

> A full-stack job platform built with the MERN stack where candidates can discover jobs, apply with a profile and resume, and track application status, while recruiters can manage companies, post jobs, and review applicants from a protected admin dashboard.

## ✨ Why This Project Stands Out

- 🔐 Role-based authentication for candidates and recruiters
- 🧾 JWT login with protected routes and secure cookie storage
- 🔎 Job search, filtering, and detailed job pages
- 📄 Resume upload and profile management with Cloudinary storage
- 🏢 Recruiter dashboard for company management, job posting, and applicant tracking
- 📦 Centralized state management with Redux Toolkit and persistence

## 🚀 Features

### 👩‍💻 Candidate Experience

- Register and log in as a candidate
- Browse jobs and open detailed job descriptions
- Search jobs by title, description, or location
- Apply for jobs and view applied job history
- Update profile information, skills, education, experience, and resume

### 🧑‍💼 Recruiter Experience

- Log in with recruiter access
- Create and manage company profiles
- Post new jobs with role details, salary, location, experience, and requirements
- View applicants for each job posting
- Update application status to pending, accepted, or rejected

## 🛠️ Tech Stack

- Frontend: React, Vite, React Router, Redux Toolkit, Tailwind CSS, Framer Motion, Radix UI, Sonner
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Multer, Cloudinary
- State Management: Redux Toolkit, redux-persist
- File Handling: Multer memory storage and Cloudinary uploads

## 🧭 How It Works

### Architecture

- The frontend is a React + Vite client that handles routing, UI state, and protected views.
- The backend is an Express API that exposes versioned routes for users, companies, jobs, and applications.
- MongoDB stores users, companies, jobs, and applications through Mongoose models.
- Authentication uses JWT stored in httpOnly cookies, with middleware guarding recruiter-only routes.
- Resume and logo uploads flow through Multer and are stored in Cloudinary.

### User Flow

1. A user signs up or logs in as either a student or recruiter.
2. The frontend stores auth state in Redux and restores it on refresh with redux-persist.
3. Students browse jobs, search by keyword, open job details, and apply.
4. Recruiters create companies, post jobs, and review applicants from the admin dashboard.
5. Application status changes are reflected back in the candidate profile view.

### Data Flow

- Frontend calls the REST API with credentials enabled.
- The backend validates the session, processes requests, and reads or writes MongoDB records.
- Uploaded files are converted and pushed to Cloudinary.
- The updated result is returned to the frontend and reflected in the UI immediately.

## 📁 Project Structure

```text
jobportal/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utils/
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── redux/
    │   └── utils/
    └── public/
```

## ⚙️ Getting Started

### Prerequisites

- Node.js installed
- MongoDB connection string
- Cloudinary account for file uploads

### Installation

Clone the repository and install dependencies for both apps:

```bash
git clone https://github.com/yvardhan1107/job_portal.git
cd job_portal

cd backend
npm install

cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=8001
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Note: the frontend API constants currently point to `http://localhost:8001`, so keep the backend on the same port for local development unless you update the endpoints in [frontend/src/utils/constant.js](frontend/src/utils/constant.js#L1).

## ▶️ Running the Project

Open two terminals and run the apps separately:

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

The frontend runs on Vite at `http://localhost:5173`.

## 🌐 API Overview

- `/api/v1/user` - authentication and profile actions
- `/api/v1/company` - company management
- `/api/v1/job` - job creation and job retrieval
- `/api/v1/application` - job applications and applicant management

## 📌 Shortlisting Highlights

- Demonstrates full-stack architecture with authentication, authorization, and file uploads
- Uses production-style patterns such as protected routes, populated MongoDB relations, and secure JWT cookies
- Includes a polished recruiter workflow with company creation, job posting, and applicant review
- Shows practical frontend engineering with reusable UI components, global state, and modern routing

## 🖼️ Screenshot

Add a project screenshot here to make the repository more attractive on GitHub.

## 📝 License

This project is currently provided without a license.