import { Router, Request, Response } from 'express';
// Routes
import { usersRoutes } from './usersRoutes.js';
import { authRoutes } from './authRoutes.js';
import { moviesRoutes } from './moviesRoutes.js';
import { searchRoutes } from './searchRoutes.js';

const router = Router();

// Simple route to check if the API is working
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API is working' });
});

// Define routes here
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.use('/search', searchRoutes);

export default router;
