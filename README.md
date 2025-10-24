# RBAC-Auth

**RBAC-Auth (Role-Based Access Control - Authentication & Authorization)** is a backend authentication and authorization system built with **Node.js**, **Express**, and **PostgreSQL (via Prisma ORM)**.

It provides a structured foundation for user authentication, role-based access, and secure token management - ideal for small to medium-scale backend systems.

---

## 🧠 Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL (via Prisma ORM)**
- **TypeScript**
- **JWT (JSON Web Token)**
- **bcrypt** (for password hashing)
- **Zod** (for input validation)
- **Nodemailer + Ethereal Email** (for email testing)
- **Postman** (for API testing)

---

## ✨ Features

- 🔐 **JWT-based authentication** with refresh token rotation  
- 🧂 **Password hashing** using bcrypt  
- 🛡️ **Protected routes** using middleware  
- 🧩 **Role-Based Access Control (RBAC)** – Admin and User roles  
- 📧 **Email verification** flow (verification link via email)  
- 🔑 **Forgot password** flow (reset link via email)  
- 🚦 **Basic rate limiting** using express-rate-limit  
- 📁 **Well-structured and organized codebase** with modular folders and files  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/rbac-auth.git
cd rbac-auth
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root with the following values:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/your-db
TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

### 4. Initialize Prisma
```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Start the development server
```bash
npm run watch
```

The server will start on **http://localhost:3000** by default.

---

## 🧪 Testing with Postman

Use Postman to test the API endpoints:

### Auth Routes

| Route | Method | Description |
|--------|---------|-------------|
| `/register` | POST | Register a new user |
| `/auth/login` | POST | Log in and receive tokens |
| `/refresh` | POST | Refresh access token |
| `/auth/logout` | POST | Log out and invalidate tokens |
| `/verify/email` | POST | Verify email via link |
| `/reset/password` | POST | Send password reset link |

### Protected Routes

| Route | Method | Description |
|--------|---------|-------------|
| `/admin` | GET | Admin-only route |

---

## ⚙️ Notes

- Email verification and forgot password flows use **Ethereal Email**, a test SMTP service. A link is logged in the console which redirects to the ethereal mail in the browser where reset/verification link is received.  
- Basic rate limiting is enabled to prevent brute-force attacks.  
- The code is modular and organized into folders for routes, controllers, middleware, and utils — making it easier to maintain and extend.  

---

## 📘 Possible Improvements

- Add centralized error handling middleware  
- Add unit and integration tests (e.g., Jest / Vitest)  
- Add Docker setup for easier deployment  
- Replace Ethereal Email with a real email provider (e.g., SendGrid, Resend)  
- Add OAuth (Google / GitHub) login  

---

## 🧑‍💻 Author

**Shreeraj Shrestha**  

---

## ✅ License

This project is open-source and available under the **MIT License**.
