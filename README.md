# Money Manager Pro – Frontend

A full-stack personal finance management application built using **React and JavaScript**. Money Manager Pro helps users manage their income and expenses through a dashboard with secure authentication and backend integration.

## 🌐 Live Demo

**[Open Money Manager Pro](https://money-manager-frontend-one-wine.vercel.app/)**

## 📸 Application Screenshots

### 1. Landing Page

![Landing Page](screenshots/Landing.png)

### 2. Registration Page

![Registration Page](screenshots/Registration.png)

### 3. Dashboard

![Dashboard](screenshots/Dashboard.png)

### 4. Income Management

![Income Management](screenshots/Income%20Management.png)

### 5. Expense Management

![Expense Management](screenshots/Expense%20Management.png)

## ✨ Features

- **User Authentication:** User registration and login with JWT authentication.
- **Email Verification:** Account activation through email verification.
- **Dashboard:** View and manage personal financial information.
- **Income Management:** Add and manage income records.
- **Expense Management:** Track and manage expenses.
- **Profile Management:** Upload and manage profile images.
- **REST API Integration:** Communicate with the Spring Boot backend using Axios.
- **Responsive Interface:** User-friendly application interface.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend library |
| JavaScript (ES6+) | Application logic |
| Axios | HTTP requests and API integration |
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| Vite | Development and build tool |
| Vercel | Frontend deployment |

## 🔗 Backend Integration

The frontend communicates with a Java Spring Boot REST API.

**Backend Repository:**

[Money Manager Pro – Backend](https://github.com/Anish-D1/moneymanager)

**Backend Deployment:**

https://money-manager-backend-riu9.onrender.com

**API Base URL:**

```text
https://money-manager-backend-riu9.onrender.com/api/v1.0
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Anish-D1/moneymanagerwebapp.git
```

### 2. Navigate to the project directory

```bash
cd moneymanagerwebapp
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root directory.

```env
VITE_API_URL=https://money-manager-backend-riu9.onrender.com
```

For local backend development, replace the URL with your local Spring Boot backend address.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

### 6. Build for production

```bash
npm run build
```

## 🚀 Deployment

The frontend is deployed using **Vercel**.

- Source code is maintained on GitHub.
- Vite handles the production build.
- Environment variables configure the backend API URL.
- Vercel hosts the deployed application.

## 🔐 Authentication

The application integrates with the backend's authentication system.

- JWT-based authentication.
- Account activation through email verification.
- Authenticated communication with protected API endpoints.
- Access to personal financial information after login.

## 📂 Project Structure

```text
moneymanagerwebapp/
│
├── public/
│
├── screenshots/
│   ├── Dashboard.png
│   ├── Expense Management.png
│   ├── Income Management.png
│   ├── Landing.png
│   └── Registration.png
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*Note: The source folder structure above is illustrative; actual folders may differ.*

## 👨‍💻 Developer

**Anish Devan**

- GitHub: [Anish-D1](https://github.com/Anish-D1)
- LinkedIn: [Anish Devan](https://www.linkedin.com/in/anish-devan)

---

⭐ Built as a hands-on full-stack development project to strengthen my React, API integration, and application development skills.
