import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes';
import { globalErrorHandler } from './middlewares/error.middleware'; // <-- Import

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '🚀 Task Management API is running',
    version: '1.0.0',
  });
});

app.use('/api/tasks', taskRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler (Harus di paling bawah!)
app.use(globalErrorHandler); // <-- Tambahan

export default app;