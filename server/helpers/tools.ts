import {Response} from 'express';

export module Tools {
  export function sendJSON(res: Response, success: boolean, result: any) {
    res.json({success: success, result: result});
  }
}
