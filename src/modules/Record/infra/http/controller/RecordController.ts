import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllWithSearchTime } from '../../../useCase/ListRecordUseCase/ListRecordService';

export default class recordController {
  public async ListAllWithSearchTime(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listWithSearch = container.resolve(ListAllWithSearchTime);
    const { startDate, endDate, status, type, bank } = request.body;

    const records = await listWithSearch.execute(
      bank,
      type,
      startDate,
      endDate,
      status
    );

    return response.status(200).json(records);
  }
}
