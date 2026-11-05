# E-Commerce Web Application

## 1. Project Overview

The E-Commerce Web Application is a full-stack web application that provides users with a convenient online shopping experience. Users can register, log in, browse products, manage their shopping cart, and proceed with checkout.

## 2. Technology Stack

**Frontend**
- React.js
- JavaScript
- HTML
- CSS
- React Router
- Vite

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer
- dotenv
- CORS

**Development Tools**
- Visual Studio Code
- Postman
- Git and GitHub
- npm

## 3. Features

- User Registration and Login
- Password Hashing
- JWT-based Authentication
- Product Browsing
- Add to Cart
- Update and Remove Cart Items
- View Cart Details
- Checkout
- OTP Generation and Email Integration
- Forgot Password and Password Reset

## 4. Project Structure

```text
ecomapp/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── .gitignore
└── README.md
```

## 5. Prerequisites

Install the following before running the project:

- Node.js
- npm
- MongoDB or MongoDB Atlas
- Git

## 6. Clone the Repository

```bash
git clone https://github.com/Varalakshmi6723/ecommerce-project
cd ecomapp
```

## 7. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and configure the required environment variables.

Start the backend server:

```bash
npm run start:dev
```

## 8. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Start the frontend application:

```bash
npm run dev
```

Open the local URL displayed in the terminal to access the application.

## 9. Available Scripts

**Backend**

| Command | Description |
|---|---|
| `npm run start:dev` | Start backend server |

**Frontend**

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build production files |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## 10. Important Note

- Install frontend and backend dependencies separately.
- Configure the required environment variables before starting the backend.
- Do not upload `.env` files or sensitive credentials to GitHub.
- Ensure MongoDB is running or properly connected through MongoDB Atlas.

