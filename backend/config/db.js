import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL;
  try {
    await mongoose.connect(mongoUrl);
    console.log("Database connected");
  } catch (error) {
    if (mongoUrl?.includes("localhost")) {
      try {
        const fallbackUrl = mongoUrl.replace("localhost", "127.0.0.1");
        await mongoose.connect(fallbackUrl);
        console.log("Database connected (IPv4 fallback)");
        return;
      } catch (fallbackError) {
        console.log("Database error:", fallbackError);
        return;
      }
    }

    console.log("Database error:", error);
  }
};
