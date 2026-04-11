import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IBank } from '../../domain/models/IBank';
import IBankRepository from '../../domain/repositories/IBankRepository';

@injectable()
export class FindBankByIdService {
  constructor(
    @inject('BankRepository')
    private bankRepository: IBankRepository
  ) {}

  async execute(id: number): Promise<IBank> {
    const result = await this.bankRepository.findById(id);
    if (!result) {
      throw new AppError(`Não existe nenhum banco com o id ${id}`);
    }
    return result;
  }
}
