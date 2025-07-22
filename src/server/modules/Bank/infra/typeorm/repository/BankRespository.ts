// src/modules/Bank/infra/typeorm/repository/BankRepository.ts
import { Bank } from '../entities/Bank';
import IBankRepository from '../../../domain/repositories/IBankRepository';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../../data-source';

export class BankRepository implements IBankRepository {
  private ormRepository: Repository<Bank>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Bank);
  }

  public async ListBankByName(bank: string): Promise<Bank | null> {
    return await this.ormRepository
      .createQueryBuilder('banks')
      .where('banks.name = :bank', { bank })
      .getOne();
  }

  public async findBankBycode(bankCode: number): Promise<Bank | null> {
    return await this.ormRepository
      .createQueryBuilder('banks')
      .where('banks.bankCode = :bankCode', { bankCode })
      .getOne();
  }
}
