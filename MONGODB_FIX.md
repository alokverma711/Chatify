# MongoDB Connection Fix

## Current Issue
The backend is running but MongoDB authentication is failing with error: `bad auth : authentication failed`

## How to Fix

### Option 1: Verify MongoDB Atlas Credentials

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in to your account
3. Navigate to your cluster (Cluster0)
4. Click **"Database Access"** in the left sidebar
5. Check your database user:
   - Username should be: `alokverma`
   - Verify the password is correct: `immortal07`
   - If password is wrong, click "Edit" and reset it

### Option 2: Create a New Database User

If the user doesn't exist or you want to create a new one:

1. In MongoDB Atlas, go to **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - Username: `alokverma` (or any username)
   - Password: `immortal07` (or a new password)
   - Database User Privileges: **"Atlas admin"** or **"Read and write to any database"**
5. Click **"Add User"**

### Option 3: Update Connection String

After verifying/creating the user, update the `.env` file:

1. In MongoDB Atlas, go to **"Database"** → Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Add database name: `/chatify` before the `?`
6. Update `MONGO_URI` in `backend/.env`:

```env
MONGO_URI=mongodb+srv://alokverma:YOUR_PASSWORD@cluster0.ffdaxuu.mongodb.net/chatify?retryWrites=true&w=majority
```

### Option 4: Whitelist IP Address

Make sure your IP is whitelisted:

1. In MongoDB Atlas, go to **"Network Access"**
2. Click **"Add IP Address"**
3. For development, you can click **"Add Current IP Address"**
4. Or add `0.0.0.0/0` to allow all IPs (less secure, only for development)

### Option 5: Use Local MongoDB (Alternative)

If you prefer to use local MongoDB:

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Update `backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/chatify
```

## After Fixing

1. Restart the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. You should see: `✓ MONGODB CONNECTED: ...` in the console

3. The login page should now work!

## Current Status

- ✅ Backend server is running on port 3000
- ✅ Frontend server is running on port 5173
- ❌ MongoDB connection is failing (authentication error)

Once MongoDB is connected, the app will be fully functional!
