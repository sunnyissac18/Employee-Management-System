# Employee Management System (EMS)

A full-stack Employee Management System built with **Spring Boot**, **React**, **MySQL**, and **Keycloak** for secure authentication and authorization.

The project follows a modular monorepo structure with separate frontend, backend, and infrastructure directories.

---

## 🚀 Features

### Employee Management

- Create new employee records
- View all employees
- View employee details
- Update employee information
- Delete employee records
- RESTful API architecture
- Persistent data storage using MySQL

### Authentication & Security

- Keycloak-based authentication
- OAuth 2.0 / OpenID Connect authentication
- JWT-based access tokens
- Spring Security Resource Server
- Bearer token authentication
- Protected backend APIs
- CORS configuration between frontend and backend
- Environment-based configuration
- Secrets excluded from version control

### Infrastructure

- Keycloak containerized using Docker
- Docker Compose configuration
- Separate infrastructure configuration
- Environment variables for credentials and deployment-specific values

---

## 🛠️ Tech Stack

### Backend

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- OAuth2 Resource Server
- JWT
- MySQL
- Lombok
- Maven

### Frontend

- React
- Vite
- React Router DOM
- Axios
- Bootstrap
- `keycloak-js`

### Authentication

- Keycloak 26.7.1
- OpenID Connect
- OAuth 2.0
- JWT Bearer Tokens

### Infrastructure

- Docker
- Docker Compose
- Keycloak

---

## 📁 Project Structure

```text
Employee-Management-System/
│
├── ems-backend/
│   ├── src/
│   │   └── main/
│   │       └── java/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── pom.xml
│   └── ...
│
├── ems-frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── ...
│
├── infra/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── docker-compose.yml
│
├── .gitignore
└── README.md
```

### Directory Responsibilities

| Directory      | Responsibility                          |
| -------------- | --------------------------------------- |
| `ems-backend`  | Spring Boot REST API and business logic |
| `ems-frontend` | React user interface                    |
| `infra`        | Docker and Keycloak infrastructure      |

---

# 🔐 Keycloak Authentication

The application uses **Keycloak as the Identity and Access Management (IAM) server**.

Instead of implementing username/password authentication directly inside the Spring Boot application, Keycloak handles user authentication and issues an access token.

The backend then validates that token before allowing access to protected APIs.

---

## 🔄 Authentication Flow

The authentication flow is:

```text
                    ┌──────────────────────┐
                    │       User           │
                    └──────────┬───────────┘
                               │
                               │ Login
                               ▼
                    ┌──────────────────────┐
                    │       React          │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               │ Redirect
                               ▼
                    ┌──────────────────────┐
                    │      Keycloak        │
                    │                      │
                    │ Realm: ems           │
                    │ Client: ems-frontend │
                    └──────────┬───────────┘
                               │
                               │ JWT Access Token
                               ▼
                    ┌──────────────────────┐
                    │       React          │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               │ Authorization:
                               │ Bearer <JWT>
                               ▼
                    ┌──────────────────────┐
                    │    Spring Boot       │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
                               │ Validate JWT
                               ▼
                    ┌──────────────────────┐
                    │       Keycloak       │
                    │ Issuer / JWK Keys    │
                    └──────────────────────┘
```

### Step-by-step

1. A user opens the React application.
2. The frontend initializes the Keycloak client.
3. If the user is not authenticated, Keycloak displays the login page.
4. The user authenticates through Keycloak.
5. Keycloak issues an access token.
6. The React application stores the authenticated Keycloak session/token.
7. API requests from the frontend include the token in the HTTP `Authorization` header.

Example:

```http
Authorization: Bearer <access-token>
```

8. The request reaches the Spring Boot backend.
9. Spring Security extracts the Bearer token.
10. The backend validates the JWT using Keycloak's issuer/JWK configuration.
11. If the token is valid, the request is allowed to reach the protected API.
12. If the token is missing, invalid, or expired, the backend rejects the request.

---

# 🧩 Frontend Keycloak Integration

The React application uses the `keycloak-js` library.

The Keycloak client is configured using environment variables rather than hardcoding environment-specific URLs.

The frontend configuration contains values such as:

```env
VITE_KEYCLOAK_URL=
VITE_KEYCLOAK_REALM=
VITE_KEYCLOAK_CLIENT_ID=
VITE_API_URL=
```

### Keycloak Client

The application uses a Keycloak client configured for the React frontend.

The client is responsible for:

- Starting the authentication flow
- Redirecting users to Keycloak
- Maintaining the authenticated session
- Obtaining access tokens
- Refreshing tokens when required
- Providing the token to API requests

---

# 🛡️ Backend Security with Spring Security

The Spring Boot backend is configured as an **OAuth 2.0 Resource Server**.

The backend does not authenticate users itself.

Instead, it trusts JWT access tokens issued by Keycloak and validates those tokens before processing protected requests.

The backend uses Keycloak's issuer/JWK configuration to validate the token signature and claims.

Conceptually:

```text
Frontend
    │
    │ Bearer JWT
    ▼
Spring Security
    │
    │ Validate JWT
    ▼
Keycloak Issuer / JWK
    │
    │ Valid
    ▼
Controller
    │
    ▼
Service
    │
    ▼
Repository
    │
    ▼
MySQL
```

This provides stateless authentication between the frontend and backend.

---

# 🌐 CORS Configuration

Because the frontend and backend run on different origins during development, CORS is configured in the Spring Boot application.

For local development:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:8080
```

The backend allows requests from the configured frontend origin.

The frontend URL is kept configurable so that the same application can be used in different environments.

For example:

```env
FRONTEND_URL=http://localhost:5173
```

---

# 🐳 Keycloak with Docker

Keycloak is containerized using Docker Compose.

The infrastructure configuration is located in:

```text
infra/docker-compose.yml
```

The project uses:

```text
Keycloak 26.7.1
```

The Keycloak container exposes its internal port `8080` through host port `8081`.

```text
Host:
http://localhost:8081

Container:
http://localhost:8080
```

This allows Keycloak to run independently from the Spring Boot and React applications.

### Start Keycloak

Navigate to the infrastructure directory:

```bash
cd infra
```

Start Keycloak:

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

Stop Keycloak:

```bash
docker compose down
```

---

# ⚙️ Keycloak Configuration

After starting Keycloak, open:

```text
http://localhost:8081
```

Create/configure the application realm:

```text
Realm:
ems
```

Configure the frontend client:

```text
Client:
ems-frontend
```

The frontend uses this client to authenticate users through Keycloak.

The exact Keycloak URLs and credentials should be supplied through environment configuration.

---

# 🔑 Environment Variables

Environment-specific configuration and secrets are intentionally separated from the source code.

There are separate `.env` files for:

```text
ems-backend/.env
ems-frontend/.env
infra/.env
```

The repository contains `.env.example` files showing the required configuration without exposing actual credentials.

### Backend

Typical backend variables include:

```env
DB_URL=
DB_USERNAME=
DB_PASSWORD=

KEYCLOAK_ISSUER_URI=
KEYCLOAK_JWK_SET_URI=

FRONTEND_URL=
```

### Frontend

Typical frontend variables include:

```env
VITE_API_URL=

VITE_KEYCLOAK_URL=
VITE_KEYCLOAK_REALM=
VITE_KEYCLOAK_CLIENT_ID=
```

### Infrastructure

Keycloak Docker configuration uses variables such as:

```env
KEYCLOAK_ADMIN_USERNAME=
KEYCLOAK_ADMIN_PASSWORD=
```

> Do not commit actual `.env` files or credentials to GitHub.

---

# 🚀 Getting Started

## Prerequisites

Install the following:

- Java 17 or higher
- Node.js and npm
- MySQL
- Docker Desktop
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/sunnyissac18/Employee-Management-System.git
```

Navigate into the project:

```bash
cd Employee-Management-System
```

---

# 2. Configure Environment Variables

Each application has its own environment configuration.

### Backend

Navigate to:

```bash
cd ems-backend
```

Create `.env` from `.env.example` and configure:

```text
Database credentials
Keycloak issuer configuration
Frontend URL
```

### Frontend

Navigate to:

```bash
cd ../ems-frontend
```

Create `.env` from `.env.example` and configure:

```text
Backend API URL
Keycloak URL
Keycloak realm
Keycloak client ID
```

### Infrastructure

Navigate to:

```bash
cd ../infra
```

Create `.env` from `.env.example` and configure the Keycloak bootstrap credentials.

---

# 3. Start Keycloak

From the `infra` directory:

```bash
docker compose up -d
```

Verify that the Keycloak container is running:

```bash
docker ps
```

Keycloak should be available at:

```text
http://localhost:8081
```

---

# 4. Configure Keycloak

Open:

```text
http://localhost:8081
```

Configure:

1. Realm
2. Client
3. Valid redirect URIs
4. Web origins
5. Users
6. Required authentication settings

The realm and client values must match the environment variables used by the React application.

---

# 5. Start the Backend

Navigate to:

```bash
cd ems-backend
```

Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

The backend will typically run on:

```text
http://localhost:8080
```

---

# 6. Start the Frontend

Open another terminal:

```bash
cd ems-frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:5173
```

---

# 🔒 API Request Security

Once the user has successfully authenticated through Keycloak, the frontend sends the access token with API requests.

Example:

```http
GET /api/employees
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

The request passes through Spring Security before reaching the controller.

```text
HTTP Request
     │
     ▼
Authorization Header
     │
     ▼
Bearer Token Extraction
     │
     ▼
JWT Validation
     │
     ├── Invalid → 401 Unauthorized
     │
     └── Valid
           │
           ▼
      REST Controller
           │
           ▼
        Service
           │
           ▼
       Repository
           │
           ▼
         MySQL
```

This prevents unauthenticated clients from directly accessing protected backend APIs.

---

# 📋 Employee API Operations

The application provides REST APIs for employee management.

Typical operations include:

```text
POST    /api/employees
GET     /api/employees
GET     /api/employees/{id}
PUT     /api/employees/{id}
DELETE  /api/employees/{id}
```

All protected endpoints require a valid Keycloak access token.

---

# 🗄️ Database

The backend uses MySQL with Spring Data JPA.

Database configuration is supplied through environment variables rather than hardcoded credentials.

The general architecture is:

```text
React
  ↓
Spring Boot REST API
  ↓
Spring Data JPA
  ↓
MySQL
```

---

# 🧱 Application Architecture

```text
┌─────────────────────────────────────────────┐
│                 React UI                    │
│              Vite + Axios                   │
└─────────────────────┬───────────────────────┘
                      │
                      │ JWT Bearer Token
                      ▼
┌─────────────────────────────────────────────┐
│              Spring Boot API                │
│                                             │
│  Spring Security → Controllers → Services   │
│                         ↓                   │
│                    Repositories             │
└───────────────┬─────────────────────────────┘
                │
                ▼
          ┌─────────────┐
          │    MySQL    │
          └─────────────┘

        Authentication
                │
                ▼
        ┌─────────────┐
        │  Keycloak   │
        │             │
        │ Realm: ems  │
        └─────────────┘
```

---

# 🔐 Security Design

The application follows a separation-of-responsibility model:

### Keycloak

Responsible for:

- User authentication
- Login flow
- Identity management
- Access token issuance
- OpenID Connect
- Token refresh

### Spring Security

Responsible for:

- Extracting Bearer tokens
- Validating JWT access tokens
- Protecting backend endpoints
- Rejecting unauthorized requests

### React

Responsible for:

- Starting the Keycloak login flow
- Maintaining the frontend authentication state
- Obtaining the access token
- Sending the access token with API requests

### MySQL

Responsible for:

- Persisting employee data

---

# 🛡️ Environment & Secret Management

The repository does **not** store actual credentials.

The following files are intentionally ignored:

```text
.env
```

Example configuration files are committed instead:

```text
ems-backend/.env.example
ems-frontend/.env.example
infra/.env.example
```

Developers should create their own `.env` files based on these examples.

---

# 🧪 Development Workflow

A typical local development workflow is:

```text
1. Start Docker Desktop
        ↓
2. Start Keycloak
        ↓
3. Start MySQL
        ↓
4. Start Spring Boot backend
        ↓
5. Start React frontend
        ↓
6. Login through Keycloak
        ↓
7. Access Employee Management APIs
```

---

# 📌 Future Improvements

Potential improvements include:

- Role-based access control
- Admin and Employee roles
- Fine-grained API authorization
- Refresh-token handling improvements
- Production Dockerization of backend and frontend
- CI/CD using GitHub Actions
- Production database deployment
- HTTPS configuration
- Centralized logging
- Monitoring and health checks

---

## 👨‍💻 Author

**Sunny Issac**

Computer Science & Engineering Student

GitHub: [@sunnyissac18](https://github.com/sunnyissac18)

---

## 📄 License

This project is intended for educational and development purposes.
