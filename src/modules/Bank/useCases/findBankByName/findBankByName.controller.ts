import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindBankByNameService } from './findBankByName.service';

export class FindBankByNameController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(FindBankByNameService);
    const { name } = request.params;
    const result = await service.execute(name);
    return response.status(200).json(result);
  }
}
