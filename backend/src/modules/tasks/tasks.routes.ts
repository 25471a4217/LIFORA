import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware.js';
import { validateBody } from '../../middleware/validation.middleware.js';
import { createTaskSchema, updateTaskSchema } from './tasks.schema.js';
import { createTask, getTasks, getTodayTasks, getWeekTasks, getTask, updateTask, deleteTask, startTask, completeTask, skipTask } from './tasks.controller.js';

const router = Router();
router.use(authenticate);
router.post('/', validateBody(createTaskSchema), createTask);
router.get('/', getTasks);
router.get('/today', getTodayTasks);
router.get('/week', getWeekTasks);
router.get('/:id', getTask);
router.patch('/:id', validateBody(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/start', startTask);
router.post('/:id/complete', completeTask);
router.post('/:id/skip', skipTask);

export { router };
