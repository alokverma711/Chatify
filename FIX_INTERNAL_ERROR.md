# Fix "Internal Server Error"

## Problem
You're seeing "Internal server error" when trying to sign up or login. This is because **MongoDB is not connected**.

## Root Cause
MongoDB authentication is failing with error: `bad auth : authentication failed`

This means either:
- ❌ Wrong username or password
- ❌ Database user doesn't exist
- ❌ IP address not whitelisted
- ❌ Connection string format is incorrect

## Solution - Fix MongoDB Connection

### Step 1: Verify/Create Database User

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in to your account
3. Click **"Database Access"** in the left sidebar
4. Check if user `alokverma` exists:
   - If it exists: Click "Edit" → Verify password is `immortal07`
   - If password is wrong: Click "Edit" → "Edit Password" → Set new password
   - If user doesn't exist: Click "Add New Database User" → Create user with password

### Step 2: Whitelist Your IP

1. In MongoDB Atlas, click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. For development, you can:
   - Click **"Add Current IP Address"** (recommended)
   - Or add `0.0.0.0/0` to allow all IPs (less secure, only for development)
4. Click **"Confirm"**

### Step 3: Get New Connection String

1. In MongoDB Atlas, go to **"Database"** → Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Select **"Node.js"** and version **"5.5 or later"**
4. Copy the connection string (it looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 4: Update .env File

1. Open `backend/.env` file
2. Replace the `MONGO_URI` line with your new connection string
3. **Important**: 
   - Replace `<username>` with your actual username (e.g., `alokverma`)
   - Replace `<password>` with your actual password
   - Add `/chatify` before the `?` to specify the database name
   
   Example:
   ```env
   MONGO_URI=mongodb+srv://alokverma:YOUR_NEW_PASSWORD@cluster0.ffdaxuu.mongodb.net/chatify?retryWrites=true&w=majority
   ```

### Step 5: Restart Backend

1. Stop the backend server (Ctrl+C in the terminal)
2. Restart it:
   ```bash
   cd backend
   npm run dev
   ```

3. You should see: `✓ MONGODB CONNECTED: ...` in the console

## After Fixing

✅ The backend will connect to MongoDB  
✅ Sign up will work  
✅ Login will work  
✅ All database features will work  

## Current Status

- ✅ Backend server: Running on port 3000
- ✅ Frontend server: Running on port 5173  
- ❌ MongoDB: Authentication failed (needs fixing)

Once MongoDB is connected, the "Internal server error" will be resolved!
