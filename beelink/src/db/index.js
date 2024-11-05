import mongoose from "mongoose";

const DB_NAME = "beelink"

export const dbConnect = async () => {
  try {
    const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log("🍀 MongoDb connected");
  } catch (error) {
    console.log("MongoDb connection error");
    process.exit(1)
  }
}