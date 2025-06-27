# School Management System

A full-stack school management system built with the MEAN (MongoDB, Express.js, Angular, Node.js) stack. This application provides role-based access control for Admins, Teachers, and Students to manage school-related data.

## Features

- **Role-Based Access Control (RBAC):** Secure dashboards and features tailored for three distinct user roles.
- **Admin Dashboard:**
  - Full CRUD (Create, Read, Update, Delete) functionality for Subjects.
  - Full CRUD for Grades (e.g., Grade 10).
  - Assign Subjects to specific Grades.
  - Full CRUD for Teacher and Student user accounts.
  - Assign Teachers and Students to specific Grades.
- **Teacher Dashboard:**
  - View a list of students assigned to the same grade as the teacher.
  - View the subjects taught in that grade.
  - Assign and update marks for each student in each subject.
- **Student Dashboard:**
  - View a list of their own marks across all assigned subjects.

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (with Mongoose), JSON Web Tokens (JWT)
- **Frontend:** Angular, TypeScript, Angular Material, SCSS

---

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (which includes npm)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas cloud instance)

---

## Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SegniZerihun/school-management
    cd school-management
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    ```
    - Create a `.env` file in the `backend` directory by copying the example:
      ```bash
      cp .env.example .env
      ```
    - Edit the `.env` file and add your MongoDB connection string and a JWT secret:
      ```
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_super_secret_key
      PORT=3000
      ```

3.  **Setup the Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

---

## Running the Application

You will need to run the backend and frontend servers in two separate terminals.

1.  **Run the Backend Server:**
    - Navigate to the `backend` directory.
    - ```bash
      npm start
      ```
    - The server will be running on `https://school-management-ea5q.onrender.com`.

2.  **Run the Frontend Server:**
    - Navigate to the `frontend` directory.
    - ```bash
      ng serve
      ```
    - The application will be available at `http://localhost:4200`.

### Default Admin Login
- **Email:** `segni@school.com`
- **Password:** `segni123`
- **Role:** `Admin`