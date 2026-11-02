import { Router } from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller';

const router = Router();

// Endpoint: /api/tasks
router.get('/', getAllTasks);
router.post('/', createTask);

// Endpoint: /api/tasks/:id
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;