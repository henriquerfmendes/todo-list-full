import express, { Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import todoRoutes from "./routes/todoRoutes";
import { AuthController } from "./controllers/AuthController";
import { authMiddleware } from "./middleware/auth";
import swaggerDocument from "./docs/swagger.json";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const authController = new AuthController();

app.post('/api/auth/register', async (req: Request, res: Response) => {
  await authController.register(req, res);
});
app.post('/api/auth/login', async (req: Request, res: Response) => {
  await authController.login(req, res);
});
app.post('/api/auth/logout', async (req: Request, res: Response) => {
  await authController.logout(req, res);
});

app.use('/api/todos', todoRoutes);

app.get('/api/user', (req, res, next) => {
    authMiddleware(req, res, next);
}, (req, res) => {
    authController.getUser(req, res);
  }
);

app.post("/api/auth/forgot-password", async (req: Request, res: Response) => {
  await authController.forgotPassword(req, res);
});

export default app;
