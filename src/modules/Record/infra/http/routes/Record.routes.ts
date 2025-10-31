import { Router } from 'express';
import { listRecordValidation } from '../validators/listRecordsValidation';
import ListRecordController from '@modules/Record/useCase/ListRecordUseCase/ListRecordController';

export const recordRouter = Router();

const controller = new ListRecordController();

recordRouter.get('/');

recordRouter.post(
  '/list-records',
  listRecordValidation,
  controller.ListAllWithSearchTime
);
