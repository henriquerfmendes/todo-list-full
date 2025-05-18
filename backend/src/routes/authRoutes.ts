import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const authController = new AuthController();

router.post("/register", async (req: Request, res: Response) => {
  await authController.register(req, res);
});

router.post("/login", async (req: Request, res: Response) => {
  await authController.login(req, res);
});

router.post("/logout", async (req: Request, res: Response) => {
  await authController.logout(req, res);
});

router.post("/forgot-password", async (req: Request, res: Response) => {
  await authController.forgotPassword(req, res);
});

router.get("/session", authMiddleware, async (req: Request, res: Response) => {
  await authController.getSession(req, res);
});

export { router as authRoutes }; 