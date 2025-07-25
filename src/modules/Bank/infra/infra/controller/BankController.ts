import { Request, Response } from "express";
import { container } from "tsyringe";
import ListAllBankService from "../../../services/ListAllBankService";



export default class BankController {

  public async ListAllBanks(reques: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListAllBankService)

    const result = await service.execute()

    return response.status(200).json(result)
  }

}