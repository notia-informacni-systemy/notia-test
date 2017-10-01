import * as path from 'path';
import {Router, Response} from 'express';
import {CsrfMiddleware} from './middlewares/csrf';
import {TestController} from './controllers/test';

const router: Router = Router();
const appFile = (req: any, res: Response) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.sendFile(path.join(__dirname, '../client/index.html'));
};

// API routes
router.use('/api/test', TestController);

// All other routes go to app file
router.get('*', CsrfMiddleware, appFile);

export const AppRouter: Router = router;
