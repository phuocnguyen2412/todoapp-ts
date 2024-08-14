import { Request, Response, Router } from "express";
import authRoute from "./auth.route";


const routes: Router = Router();

routes.get("/hello-world", (req: Request, res: Response) => {
    res.send("Hello world from the API!");
});
routes.use("/auth", authRoute);



export default routes;
