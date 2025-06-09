import { Router } from 'express';
import { recordController } from '../controller';
import { getRecordsValidation } from '../middleware/getRecordValidation';
import { listRecordValidation } from '../middleware/listRecordsValidation';

export const consultaRouter = Router();

consultaRouter.get('/');

consultaRouter.get(
  '/:type/:bank',
  getRecordsValidation,
  recordController.getRecords
);

consultaRouter.post(
  '/list-records',
  listRecordValidation,
  recordController.listRecords
);
