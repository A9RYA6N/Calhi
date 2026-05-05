# Calhi - Booking Management System

Calhi is a comprehensive scheduling and booking management platform, conceptually similar to Calendly. It enables users to manage their availability, define single or recurring timeslot series, and provides a public-facing interface for invitees to seamlessly book appointments.

## 🚀 Features

- **User Authentication**: Secure user registration and login using JWT and bcrypt password hashing.
- **Advanced Scheduling System**: 
  - Create and manage individual availability timeslots.
  - Support for **Recurring Timeslots**: Materialize recurring availability series into distinct slots grouped by intelligent slugs.
- **Public Booking Interface**: Clean, accessible public pages (`/[username]`) for invitees to view available slots and seamlessly submit bookings.
- **Email Notifications**: Automated booking confirmation and verification emails powered by Go `gomail`.
- **Modern & Responsive UI**: Beautifully designed user interface utilizing Tailwind CSS v4 and Shadcn UI components.
- **Robust State Management**: Predictable frontend state handling using Redux Toolkit.

## 🛠️ Technology Stack

### Frontend
- **React 19** & **Vite**
- **TypeScript**
- **Tailwind CSS v4** & **Shadcn UI** for styling and UI components
- **Redux Toolkit** for state management
- **React Router v7** for routing
- **Axios** for API requests

### Backend
- **Go 1.25**
- **Gin Web Framework** for handling HTTP routing
- **GORM** (Object Relational Mapper)
- **PostgreSQL** for relational data storage
- **JWT (JSON Web Tokens)** for secure authentication

---

## ⚙️ How to Pull and Run the Project

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- [Go (1.25+)](https://golang.org/doc/install)
- [Node.js (v20+)](https://nodejs.org/) & npm
- [PostgreSQL](https://www.postgresql.org/download/) database running locally or remotely.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Calhi
```

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd backend
```

Install Go dependencies:
```bash
go mod tidy
```

Set up Environment Variables:
Create a `.env` file in the `backend` directory with the following variables (adjust values as needed):
```env
PORT=8080
DB_URL="host=localhost user=youruser password=yourpassword dbname=calhi port=5432 sslmode=disable"
JWT_SECRET="your_super_secret_jwt_key"
FRONTEND_URL="http://localhost:5173"
SMTP_MAIL="your_email@gmail.com"
SMTP_PASSWORD="your_email_app_password"
```
*(Note: Ensure your PostgreSQL database `calhi` is created before starting the server so GORM can automatically migrate the schema).*

Start the Backend Server:
```bash
go run main.go
```
The server should now be running on `http://localhost:8080`.

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory from the project root:
```bash
cd frontend
```

Install Node dependencies:
```bash
npm install
```

Set up Environment Variables:
Create a `.env` file in the `frontend` directory with the following API endpoints (pointing to your local backend):
```env
VITE_BACKEND_USER="http://localhost:8080/api/user"
VITE_BACKEND_TIMESLOT="http://localhost:8080/api/timeslot"
VITE_BACKEND_BOOKING="http://localhost:8080/api/bookings"
```

Start the Frontend Development Server:
```bash
npm run dev
```
The frontend application should now be running and is typically accessible at `http://localhost:5173`.
