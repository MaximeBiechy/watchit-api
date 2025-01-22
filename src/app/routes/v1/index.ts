import { Router, Request, Response } from 'express';
// Routes

const router = Router();

// Simple route to check if the API is working
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API is working' });
});

// Define routes here

export default router;
