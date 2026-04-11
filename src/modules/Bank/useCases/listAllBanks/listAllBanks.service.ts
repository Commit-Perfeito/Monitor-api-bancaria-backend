import { inject, injectable } from 'tsyringe';
import { IBank } from '../../domain/models/IBank';
import IBankRepository from '../../domain/repositories/IBankRepository';

@injectable()
export class ListAllBanksService {
  constructor(
    @inject('BankRepository')
    private bankRepository: IBankRepository
  ) {}

  async execute(): Promise<IBank[]> {
    const banks = await this.bankRepository.list();
    return banks;
  }
}
