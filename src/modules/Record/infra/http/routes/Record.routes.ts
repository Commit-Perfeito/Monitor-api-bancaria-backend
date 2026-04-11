import { Router } from 'express';
import { listRecordValidation } from '../validators/listRecordsValidation';
import { ListRecordController } from '@modules/Record/useCases/listRecord/listRecord.controller';

export const recordRouter = Router();

const listRecordController = new ListRecordController();

recordRouter.get('/');

recordRouter.post(
  '/list-records',
  listRecordValidation,
  listRecordController.handle
);
