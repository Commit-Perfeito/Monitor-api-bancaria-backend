import { Request, Response } from "express";
import { container } from "tsyringe";
import ListAllBankService from "../../../services/ListAllBankService";
import { FindBankByName } from "@modules/Bank/services/FindBankByNameService";



export default class BankController {

  public async ListAllBanks(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(ListAllBankService)

    const result = await service.execute()

    return response.status(200).json(result)
  }
  public async FindByName(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(FindBankByName)
    const { name } = request.params
    const result = await service.execute(name)

    return response.status(200).json(result)
  }

}