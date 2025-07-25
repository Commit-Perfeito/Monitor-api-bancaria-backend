import { Router } from 'express';
import BankController from '../controller/BankController';

export const BankRouter = Router();
const controller = new BankController()


BankRouter.get(
  '/',
  controller.ListAllBanks
);
