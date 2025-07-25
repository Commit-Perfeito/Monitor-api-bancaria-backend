import { inject, injectable } from "tsyringe";
import { BankRepository } from "../infra/typeorm/repository/BankRespository";
import { IBank } from "../domain/models/IBank";

@injectable()
export default class ListAllBankService {

  constructor(
    @inject('BankRepository')
    private BankRepository: BankRepository
  ) {

  }
  async execute(): Promise<IBank[]> {

    const banks = await this.BankRepository.list()

    return banks;
  }

}