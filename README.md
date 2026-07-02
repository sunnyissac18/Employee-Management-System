# Employee Management System (EMS)

A full-stack Employee Management System built with a Spring Boot backend and a React frontend.

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot** (Spring Web, Spring Data JPA)
- **MySQL** Database
- **Lombok** (for boilerplate code reduction)
- **Maven** (build tool)

### Frontend
- **React** (with Vite)
- **React Router DOM** (for routing)
- **Axios** (for API calls)
- **Bootstrap** (for styling)

## 📁 Project Structure

This is a monorepo containing both the frontend and backend applications:

- `/ems-backend` - Contains the Spring Boot Java application.
- `/ems-frontend` - Contains the React single-page application.

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js and npm
- MySQL Server

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd ems-backend
   ```
2. Configure your MySQL database credentials in `application.properties` (or `.env` if configured).
3. Build and run the backend using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend will typically start on `http://localhost:8080`.*

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ems-frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will typically be accessible on `http://localhost:5173`.*

## 📝 Features
- Create new employee records.
- View a list of all employees.
- Update existing employee details.
- Delete employees from the system.
