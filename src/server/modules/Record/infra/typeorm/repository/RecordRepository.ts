import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../../../data-source';
import IRecordRepository from '../../../domain/repositories/IRecordRepository';
import { Record } from '../entities/Record';
import { IBank } from '../../../../Bank/domain/models/IBank';
import { Bank } from '../../../../Bank/infra/typeorm/entities/Bank';

type Timestamp = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

export class RecordRepository implements IRecordRepository {
  private readonly ormRepository: Repository<Record>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Record);
  }

  async ListRecordsBetween(
    bankId: number,
    type: string,
    start: Timestamp,
    end: Timestamp,
    status?: string
  ): Promise<Record[] | null> {
    const query = this.ormRepository.createQueryBuilder('records')
      .where('records.type = :type', { type })
      .andWhere('records.bankId = :bankId', { bankId })
      .andWhere(
        `(
          (records.year > :startYear OR 
          (records.year = :startYear AND records.month > :startMonth) OR 
          (records.year = :startYear AND records.month = :startMonth AND records.day > :startDay) OR 
          (records.year = :startYear AND records.month = :startMonth AND records.day = :startDay AND records.hour > :startHour) OR 
          (records.year = :startYear AND records.month = :startMonth AND records.day = :startDay AND records.hour = :startHour AND records.minute > :startMinute) OR 
          (records.year = :startYear AND records.month = :startMonth AND records.day = :startDay AND records.hour = :startHour AND records.minute = :startMinute AND records.second >= :startSecond))
        ) AND (
          (records.year < :endYear OR 
          (records.year = :endYear AND records.month < :endMonth) OR 
          (records.year = :endYear AND records.month = :endMonth AND records.day < :endDay) OR 
          (records.year = :endYear AND records.month = :endMonth AND records.day = :endDay AND records.hour < :endHour) OR 
          (records.year = :endYear AND records.month = :endMonth AND records.day = :endDay AND records.hour = :endHour AND records.minute < :endMinute) OR 
          (records.year = :endYear AND records.month = :endMonth AND records.day = :endDay AND records.hour = :endHour AND records.minute = :endMinute AND records.second <= :endSecond))
        )`
      )
      .setParameters({
        ...start,
        startYear: start.year,
        startMonth: start.month,
        startDay: start.day,
        startHour: start.hour,
        startMinute: start.minute,
        startSecond: start.second,
        endYear: end.year,
        endMonth: end.month,
        endDay: end.day,
        endHour: end.hour,
        endMinute: end.minute,
        endSecond: end.second,
      })
      .orderBy('records.year', 'ASC')
      .addOrderBy('records.month', 'ASC')
      .addOrderBy('records.day', 'ASC')
      .addOrderBy('records.hour', 'ASC')
      .addOrderBy('records.minute', 'ASC')
      .addOrderBy('records.second', 'ASC');

    if (status) {
      query.andWhere('records.status = :status', { status });
    }

    return query.getMany();
  }

  async ListRecordsByStatus(
    bankId: number,
    type: string,
    limit: number,
    status?: string
  ): Promise<Record[] | null> {
    const query = this.ormRepository.createQueryBuilder('records')
      .where('records.type = :type', { type })
      .andWhere('records.bankId = :bankId', { bankId });

    if (status) {
      query.andWhere('records.status = :status', { status });
    }

    const order = limit === 1 ? 'DESC' : 'ASC';

    return query
      .orderBy('records.dateCreated', order)
      .take(limit)
      .getMany();
  }

  async CreateRecord(
    type: string,
    codeResponse: number,
    status: string,
    timeRequest: number,
    payload: object,
    bank: Bank,
    detailing: string,
    responseStatus: string
  ): Promise<Record> {
    const newRecord = this.ormRepository.create({
      type,
      codeResponse,
      status,
      timeRequest,
      payloadResponse: payload,
      bank,
      detailing,
      responseStatus,
    });

    return this.ormRepository.save(newRecord);
  }
}
