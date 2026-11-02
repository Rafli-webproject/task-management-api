import { Request, Response } from 'express';
import { tasks } from '../models/task.data';
import { Task, TaskInput, TaskStatus } from '../models/task.model';
import { sendSuccess, sendError } from '../utils/response';

// Daftar status yang valid
const VALID_STATUSES: TaskStatus[] = ['pending', 'in-progress', 'completed'];

// Fungsi bantuan untuk validasi
const validateInput = (title: string | undefined, status: string | undefined) => {
  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return 'Title wajib diisi dan harus berupa teks!';
  }
  if (status !== undefined && !VALID_STATUSES.includes(status as TaskStatus)) {
    return `Status tidak valid. Pilih salah satu: ${VALID_STATUSES.join(', ')}`;
  }
  return null;
};

export const getAllTasks = (req: Request, res: Response) => {
  sendSuccess(res, tasks, 'Berhasil mengambil semua data task');
};

export const getTaskById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) return sendError(res, 'Task tidak ditemukan', 404);
  sendSuccess(res, task, 'Berhasil mengambil data task');
};

export const createTask = (req: Request, res: Response) => {
  const { title, description, status } = req.body as TaskInput;
  
  // Panggil fungsi validasi
  const errorMessage = validateInput(title, status);
  if (errorMessage) return sendError(res, errorMessage, 400);

  const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

  const newTask: Task = {
    id: nextId,
    title: title.trim(),
    description: description || '',
    status: status || 'pending', 
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tasks.push(newTask);
  sendSuccess(res, newTask, 'Task berhasil dibuat', 201);
};

export const updateTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, description, status } = req.body as Partial<TaskInput>;
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) return sendError(res, 'Task tidak ditemukan', 404);

  // Panggil fungsi validasi
  const errorMessage = validateInput(title, status);
  if (errorMessage) return sendError(res, errorMessage, 400);

  const updatedTask: Task = {
    ...tasks[taskIndex],
    title: title !== undefined ? title.trim() : tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    status: status !== undefined ? status : tasks[taskIndex].status,
    updatedAt: new Date(),
  };

  tasks[taskIndex] = updatedTask;
  sendSuccess(res, updatedTask, 'Task berhasil diupdate');
};

export const deleteTask = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) return sendError(res, 'Task tidak ditemukan', 404);

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  sendSuccess(res, deletedTask, 'Task berhasil dihapus');
};