import { Router } from 'express';
import recordController from '../controller/RecordController';
import { listRecordValidation } from '../../../validators/listRecordsValidation';

export const recordRouter = Router();
const controller = new recordController()


recordRouter.get('/');

recordRouter.post(
  '/list-records',
  listRecordValidation,
  controller.ListAllWithSearchTime
);
