import dotenv from "dotenv";
dotenv.config();
const envServer = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
};
export default envServer;
