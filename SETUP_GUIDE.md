# Chatify Setup Guide

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Set Up MongoDB

You have two options:

#### Option A: MongoDB Atlas (Recommended - Free & Easy)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier M0)
4. Create a database user (username and password)
5. Whitelist your IP address (or use `0.0.0.0/0` for development)
6. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/chatify?retryWrites=true&w=majority`

#### Option B: Local MongoDB

1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Or run manually
   mongod
   ```

### Step 3: Configure Environment Variables

The `.env` file in the `backend` directory has been created with a generated JWT secret.

**Update the MONGO_URI:**
- For MongoDB Atlas: Replace with your Atlas connection string
- For Local MongoDB: Keep as `mongodb://localhost:27017/chatify`

**Optional Variables:**
- `RESEND_API_KEY`: For sending welcome emails (get from [resend.com](https://resend.com))
- `CLOUDINARY_*`: For profile picture uploads (get from [cloudinary.com](https://cloudinary.com))
- `ARCJET_KEY`: For rate limiting (get from [arcjet.com](https://arcjet.com))

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Step 5: Access the Application

Open your browser and go to: `http://localhost:5173`

## Troubleshooting

### Backend won't start
- Check if MongoDB is running (for local setup)
- Verify MONGO_URI in `.env` file is correct
- Check if port 3000 is already in use

### Frontend can't connect to backend
- Ensure backend is running on port 3000
- Check CORS settings in backend (CLIENT_URL should be `http://localhost:5173`)
- Verify the API URL in `frontend/src/lib/axios.js`

### MongoDB connection errors
- For Atlas: Check your IP is whitelisted
- For Local: Ensure MongoDB service is running
- Verify connection string format is correct

## Features

- ✅ Real-time messaging with Socket.io
- ✅ User authentication (JWT)
- ✅ Profile management
- ✅ Online/offline status
- ✅ Modern UI with Tailwind CSS

Enjoy chatting! 💬
