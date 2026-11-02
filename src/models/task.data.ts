import { Task } from './task.model';

export let tasks: Task[] = [
  {
    id: 1, // <-- Ubah ke angka
    title: 'Belajar Express JS',
    description: 'Mempelajari routing dan middleware dasar',
    status: 'completed',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2, // <-- Ubah ke angka
    title: 'Membuat API Task Management',
    description: 'Menyelesaikan tugas Day 1 kelas XI RPL',
    status: 'in-progress',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];