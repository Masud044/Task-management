import express from 'express';
import {
  getTasks,
  
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/', getTasks);

router.post('/', createTask);
router.get('/:id', getTaskById);      
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
