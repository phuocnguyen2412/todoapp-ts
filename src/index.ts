import express, { Request, Response, Express } from "express";
import routes from "./routes";
import bodyParser from "body-parser";
import connectDb from "./configs/database.config";
import { createServer, Server } from "http";
import corsOptions from "./configs/cors.config";
import cors from "cors";
import env from "./env";



const app: Express = express();

const PORT: string | number = env.envServer.PORT || 3000;

// Connect to the database
connectDb();

// Middleware setup
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use("/api/v1", routes);

// Create HTTP server
const httpServer: Server = createServer(app);

// Start the server
httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
