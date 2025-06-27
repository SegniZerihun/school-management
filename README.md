# MEAN Stack School Management System

A simple school management system built with the MEAN Stack (MongoDB, Express.js, Angular, Node.js). This application demonstrates a full-stack project featuring a RESTful API backend and a single-page application (SPA) frontend, complete with role-based access control (RBAC).

# Core Technologies
-   MongoDB  : NoSQL database for storing application data.
-   Express.js  : Backend framework for building the RESTful API.
-   Angular  : Frontend framework for building the user interface.
-   Node.js  : JavaScript runtime for the backend server.
-   Mongoose  : ODM for modeling and interacting with MongoDB.
-   JSON Web Tokens (JWT)  : For secure authentication.
-   Angular Material  : For UI components.

# Features

# Admin
- [x] Manage (CRUD) Teachers and Students.
- [x] Manage (CRUD) Subjects.
- [x] Manage (CRUD) Grades.

# Teacher
- [x] View a list of all students.
- [x] Assign and update marks for students in various subjects.

# Student
- [x] View their own marks for all enrolled subjects.

---

# Prerequisites
- [Node.js and npm](https://nodejs.org/en/) (LTS version is recommended)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- A MongoDB instance:
    -   Recommended:   A free cloud database from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    -   Alternatively:   A local instance using [Docker](https://www.docker.com/).

---

# Local Setup and Installation

Follow these steps to get your development environment running.
# School Management System

## 🛠️ Setup Instructions

### 1. Clone the project
```bash
git clone https://github.com/SegniZerihun/school-management.git
cd your-repo
2. Install Backend
cd backend
npm install
3. Install Frontend
cd ../frontend
npm install
4. Run the app
Backend
cd backend
npm start
Frontend
cd ../frontend
ng serve
