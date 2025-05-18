import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.get("/", (req: Request, res: Response) => {
  authController.getUser(req, res);
});

export { router as userRoutes }; 