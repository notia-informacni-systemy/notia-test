import { Request, Response, Router } from 'express';
import { Knex } from '../utils/db';

const router: Router = Router();

// define '/api/common/*' routes
router.get('/test', get_testEndpoint);

async function get_testEndpoint(req: Request, res: Response) {
  try {
    const result = await Knex
      .select('firstname', 'lastname')
      .from('users');

    res.json({ result: result });
  } catch (err) {
    res.json({ error: err });
  }
}

// export router
export const CommonController: Router = router;
