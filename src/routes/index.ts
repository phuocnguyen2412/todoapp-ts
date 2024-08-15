import { Request, Response, Router } from "express";
import authRoute from "./auth.route";
import taskRoute from "./task.route";


const routes: Router = Router();

routes.get("/hello-world", (req: Request, res: Response) => {
    res.send("Hello world from the API!");
});
routes.use("/auth", authRoute);
routes.use("/tasks", taskRoute)


export default routes;
