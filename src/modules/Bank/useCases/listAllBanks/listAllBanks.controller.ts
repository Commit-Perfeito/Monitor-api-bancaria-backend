import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllBanksService } from './listAllBanks.service';

export class ListAllBanksController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListAllBanksService);
    const result = await service.execute();
    return response.status(200).json(result);
  }
}
