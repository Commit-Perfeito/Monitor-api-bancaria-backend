import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetRecordsService } from '../../../service/getRecordService';
import { ListAllWithSearchTime } from '../../../service/listRecordService';

export default class recordController {
  public async listAll(request: Request, response: Response): Promise<Response> {

    const listAll = container.resolve(GetRecordsService)

    const { bank, type, } = request.params
    const { filter, status } = request.query

    const records = await listAll.execute(bank, type, filter as string, status as string)

    return response.status(200).json(records)
  }
  public async ListAllWithSearchTime(request: Request, response: Response): Promise<Response> {

    const listWithSearch = container.resolve(ListAllWithSearchTime)
    const { startDate, endDate, status, type, bank } = request.body;

    const records = await listWithSearch.execute(bank, type, startDate, endDate, status)

    return response.status(200).json(records)
  }

};


