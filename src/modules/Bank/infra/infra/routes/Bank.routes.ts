import { Router } from 'express';
import { ListAllBanksController } from '@modules/Bank/useCases/listAllBanks/listAllBanks.controller';
import { FindBankByNameController } from '@modules/Bank/useCases/findBankByName/findBankByName.controller';

export const BankRouter = Router();

const listAllBanksController = new ListAllBanksController();
const findBankByNameController = new FindBankByNameController();

BankRouter.get('/', listAllBanksController.handle);
BankRouter.get('/:name', findBankByNameController.handle);
