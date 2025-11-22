import { Request, Response } from 'express';
import { ListAllWithSearchTime } from './ListRecordService';
import { RecordRepository } from '@modules/Record/infra/typeorm/repository/RecordRepository';
import { BankRepository } from '@modules/Bank/infra/typeorm/repository/BankRespository';
import RedisCache from '@shared/providers/cache/implementations/RedisCache';

export default class ListRecordController {
  public async ListAllWithSearchTime(
    request: Request,
    response: Response
  ): Promise<Response> {
    const recordRepository = new RecordRepository();
    const bankRepository = new BankRepository();
    const redisCache = new RedisCache();
    const listRecords = new ListAllWithSearchTime(
      recordRepository,
      bankRepository,
      redisCache
    );

    const { startDate, endDate, status, type, bank } = request.body;

    const records = await listRecords.execute(
      bank,
      type,
      startDate,
      endDate,
      status
    );

    return response.status(200).json(records);
  }
}
