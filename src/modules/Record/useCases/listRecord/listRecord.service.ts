import { inject, injectable } from 'tsyringe';
import IRecordRepository from '../../domain/repositories/IRecordRepository';
import { parseDate } from '@shared/utils/ParseDate';
import { IRecord } from '../../domain/models/IRecord';
import AppError from '@shared/errors/AppError';
import IBankRepository from '@modules/Bank/domain/repositories/IBankRepository';
import { ICacheProvider } from '@shared/providers/cache/models/ICacheProvider';

@injectable()
export class ListRecordService {
  constructor(
    @inject('RecordRepository')
    private recordRepository: IRecordRepository,
    @inject('bankRepository')
    private bankRepository: IBankRepository,
    @inject('cacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute(
    bank: string,
    type: string,
    startDateStr: string,
    endDateStr: string,
    status: string
  ): Promise<IRecord[]> {
    let products = await this.cacheProvider.recover<IRecord[]>(
      'monitor-RECORD_LIST'
    );

    if (products) {
      return products;
    }

    const banco = await this.bankRepository.listBankByName(bank);

    if (!banco) {
      throw new AppError('Banco não existe');
    }
    const bankId = banco.id;

    const startDate = parseDate(startDateStr);
    const endDate = parseDate(endDateStr);

    const records = await this.recordRepository.ListRecordsBetween(
      bankId,
      type,
      startDate,
      endDate,
      status
    );

    if (!Array.isArray(records) || records.length === 0) return [];

    if (records.length > 0) {
      await this.cacheProvider.save('monitor-RECORD_LIST', records);
    }
    return records;
  }
}
