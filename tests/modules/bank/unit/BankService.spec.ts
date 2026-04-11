import 'reflect-metadata';
import FakeBankRepository from '../repositories/FakeBankRepository';
import AppError from '@shared/errors/AppError';
import { FindBankByIdService } from '@modules/Bank/useCases/findBankById/findBankById.service';
import { FindBankByNameService } from '@modules/Bank/useCases/findBankByName/findBankByName.service';

let findById: FindBankByIdService;
let getByName: FindBankByNameService;
let fakeBankRepository: FakeBankRepository;
describe('get bank By id', () => {
  beforeEach(() => {
    fakeBankRepository = new FakeBankRepository();
    findById = new FindBankByIdService(fakeBankRepository);
  });
  it('Deve-se achar o banco pelo nome', async () => {
    const id = 1;

    const response = await findById.execute(id);

    expect(response.id).toEqual(id);
    expect(response.name).toEqual('BANCODOBRASIL_V2');
  });
  it('Deve-se retornar erro ao tentar achar um banco pelo nome errado', async () => {
    const idWrong = 20;

    await expect(findById.execute(idWrong)).rejects.toBeInstanceOf(AppError);
  });
});

describe('get bank By name', () => {
  beforeEach(() => {
    fakeBankRepository = new FakeBankRepository();
    getByName = new FindBankByNameService(fakeBankRepository);
  });
  it('Deve-se achar o banco pelo nome', async () => {
    const name = 'BANCODOBRASIL_V2';

    const response = await getByName.execute(name);

    expect(response.name).toEqual(name);
    expect(response.id).toEqual(1);
    expect(response.name).toEqual('BANCODOBRASIL_V2');
  });
  it('Deve-se retornar erro ao tentar achar um banco pelo nome errado', async () => {
    const nameWrong = 'nubank';

    await expect(getByName.execute(nameWrong)).rejects.toBeInstanceOf(AppError);
  });
});
