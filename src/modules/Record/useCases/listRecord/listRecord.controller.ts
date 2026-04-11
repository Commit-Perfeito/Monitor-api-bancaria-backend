import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListRecordService } from './listRecord.service';

export class ListRecordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListRecordService);
    const { startDate, endDate, status, type, bank } = request.body;

    const records = await service.execute(
      bank,
      type,
      startDate,
      endDate,
      status
    );

    return response.status(200).json(records);
  }
}
