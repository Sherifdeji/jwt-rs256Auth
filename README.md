# 🔐 JWT-RS256 Auth API

A simple authentication API built with **Node.js**, **Express**, **TypeScript** and J**WT RS256** key-based authentication.

## 🚀 Features

- 🛡️ RSA-based JWT authentication (RS256)
- 🔐 Sign-up & Sign-in with hashed passwords
- 🔑 Protected route with token verification
- 🧪 Easily testable with Postman
- ♻️ Clean modular structure

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Auth**: JWT RS256 (asymmetric encryption)

## 🔧 Setup Instructions

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/jwt-rs256-api.git
   cd jwt-rs256-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set Up .env file**

   ```bash
   PORT=5000
   PRIVATE_KEY_2025_04="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   PUBLIC_KEY_2025_04="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----\n"
   ```

4. **Run the app**

   ```bash
   npx ts-node src/app.ts
   ```

## 📬 API Endpoints

| Method | Endpoint              | Description            | Auth Required   |
| ------ | --------------------- | ---------------------- | --------------- |
| POST   | `/api/auth/signup`    | Register new user      | ❌              |
| POST   | `/api/auth/signin`    | Authenticate user      | ❌              |
| GET    | `/api/auth/protected` | Access protected route | ✅ Bearer Token |

## 🔐 Testing Protected Routes

1. Get a JWT token from POST /api/auth/signin
2. In headers, add: Authorization: Bearer YOUR_JWT_TOKEN

## 📁 Project Structure

src/
├── controllers/
├── routes/
├── services/
├── utils/
└── app.ts

## 📝 License

MIT License. Feel free to use and modify for your own projects.

---

_**Built with ❤️ by Sherif Ibrahim**_
