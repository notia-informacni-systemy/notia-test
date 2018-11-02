import { Response, Router, Request } from 'express';
import * as path from 'path';
import { CommonController } from './controllers/common';

// Create the router itself
const router: Router = Router();
const appFile = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
};

// API routes
router.use('/api/common', CommonController);

// All other routes go to the app file
router.get('*', appFile);

export const AppRouter: Router = router;
