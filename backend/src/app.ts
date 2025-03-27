import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import todoRoutes from './routes/todoRoutes';
import { errorMiddleware } from './middleware/errorMiddleware';
import swaggerDocument from './docs/swagger.json';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/todos', todoRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorMiddleware(err, req, res, next);
});

export default app;
