import dotenv from "dotenv";
dotenv.config();
const envServer = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
};
const envEmail = {
    EMAIL: process.env.EMAIL_USER,
    PASSWORD: process.env.EMAIL_PASSWORD,
}
export default {
    envServer,
    envEmail
};
