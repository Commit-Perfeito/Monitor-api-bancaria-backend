import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IBank } from '../domain/models/IBank';
import IBankRepository from '../domain/repositories/IBankRepository';

@injectable()
export class FindBankByName {
  constructor(
    @inject('BankRepository')
    private bankRepository: IBankRepository
  ) { }

  async execute(bank: string): Promise<IBank> {
    const result = await this.bankRepository.listBankByName(bank);

    // Se não encontrou, lança um erro em vez de retornar null.
    if (!result) {
      throw new AppError(`Não existe nenhum banco com o nome ${bank}`);
    }

    return result;
  }
}