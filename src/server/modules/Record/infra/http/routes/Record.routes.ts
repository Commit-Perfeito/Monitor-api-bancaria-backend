import { Router } from 'express';
import recordController from '../controller/RecordController';
import { getRecordsValidation } from '../../../validators/getRecordValidation';
import { listRecordValidation } from '../../../validators/listRecordsValidation';

export const recordRouter = Router();
const controller = new recordController()


recordRouter.get('/');

recordRouter.get(
  '/:type/:bank',
  getRecordsValidation,
  controller.listAll
);

recordRouter.post(
  '/list-records',
  listRecordValidation,
  controller.ListAllWithSearchTime
);
