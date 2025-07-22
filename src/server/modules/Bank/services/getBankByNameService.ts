import { BankRepository } from '../infra/typeorm/repository/BankRespository';
import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IBankRepository from '../domain/repositories/IBankRepository';
import { IBank } from '../domain/models/IBank';


@injectable()
export class getBankByNameService {
  constructor(
    @inject('BankRepository')
    private bankRepository: IBankRepository
  ) {

  } async execute(bank: string): Promise<IBank> {
    const result = await this.bankRepository.ListBankByName(bank);
    if (!result) {
      //caso não tenha retorna err
      throw new AppError(`Não existe nenhum banco com o nome ${bank} `);
    }
    return result;
  }
}
