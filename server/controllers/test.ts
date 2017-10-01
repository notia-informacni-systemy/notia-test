import {Router, Request, Response} from 'express';
import {CsrfMiddleware} from '../middlewares/csrf';
import {Tools} from '../helpers/tools';
import {Transaction} from '../helpers/transaction';
import * as Test from '../models/test';
import 'rxjs/add/operator/mergeMap';

const router: Router = Router();

// define '/api/test/*' routes here
router.get('/', CsrfMiddleware, _get);
// router.post('/', CsrfMiddleware, _post);

// define route-handlers here

function _get(req: Request, res: Response) {
  Test.getTestData().subscribe(
    data => {
      Tools.sendJSON(res, true, data);
    },
    err => {
      Tools.sendJSON(res, false, err);
    }
  );
}

// export router
export const TestController: Router = router;
