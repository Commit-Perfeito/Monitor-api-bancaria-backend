// src/modules/Bank/infra/typeorm/repository/BankRepository.ts
import { Bank } from '../entities/Bank';
import IBankRepository from '../../../domain/repositories/IBankRepository';
import { Repository } from 'typeorm';
import { AppDataSource } from '@shared/infra/typeorm/data-source';
// import { AppDataSource } from '../../../../../shared/infra/typeorm/data-source';

export class BankRepository implements IBankRepository {
  private ormRepository: Repository<Bank>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Bank);
  }

  public async listBankByName(bank: string): Promise<Bank | null> {
    return await this.ormRepository
      .createQueryBuilder('banks')
      .where('banks.name = :bank', { bank })
      .getOne();
  }
  public findById(id: number): Promise<Bank | null> {
    return this.ormRepository.findOneBy({ id });
  }

  public async findBankBycode(bankCode: number): Promise<Bank | null> {
    return await this.ormRepository
      .createQueryBuilder('banks')
      .where('banks.bankCode = :bankCode', { bankCode })
      .getOne();
  }
  public async list(): Promise<Bank[]> {
    return await this.ormRepository
      .createQueryBuilder('banks')
      .getMany();
  }
}
