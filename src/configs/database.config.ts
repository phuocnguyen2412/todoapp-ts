import mongoose from "mongoose";
import dotenv from "dotenv";
import env from "../env";

dotenv.config();
const stringUrl: string = env.envServer.MONGODB_URL || "";
console.log(stringUrl);

const connectDb = async (): Promise<void> => {
    try {
        await mongoose.connect(stringUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDb;
