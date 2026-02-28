import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) {
      console.error("MONGO_URI is not set in environment variables");
      console.log("Server will continue but database features will not work.");
      return;
    }

    // Mask password in connection string for logging
    const maskedUri = MONGO_URI.replace(/:\/\/[^:]+:[^@]+@/, '://***:***@');
    console.log("Attempting to connect to MongoDB:", maskedUri);

    const conn = await mongoose.connect(ENV.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("✓ MONGODB CONNECTED:", conn.connection.host);
  } catch (error) {
    console.error("✗ Error connecting to MONGODB:", error.message);
    if (error.message.includes("authentication failed") || error.message.includes("bad auth")) {
      console.error("\n⚠️  AUTHENTICATION ERROR:");
      console.error("   - Check your username and password in MongoDB Atlas");
      console.error("   - Go to: Database Access → Verify user credentials");
      console.error("   - Make sure your IP is whitelisted in Network Access");
    } else if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
      console.error("\n⚠️  NETWORK ERROR:");
      console.error("   - Check your internet connection");
      console.error("   - Verify the cluster URL is correct");
    }
    console.error("\nServer will continue but database features will not work.");
    console.error("Update MONGO_URI in backend/.env and restart the server.\n");
    // Don't exit - allow server to start for debugging
    // process.exit(1);
  }
};