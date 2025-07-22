import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IBankRepository from '../domain/repositories/IBankRepository';
import { IBank } from '../domain/models/IBank';


@injectable()
export default class getBankByCodeService {
  constructor(
    @inject('BankRepository')
    private bankRepository: IBankRepository
  ) { }
  // service  para buscar banco pelo código
  async execute(bank: number): Promise<IBank> {
    const result = await this.bankRepository.findBankBycode(bank);
    if (!result) {
      // caso não tenha retorna
      throw new AppError(`Não existe nenhum banco com o Code ${bank}`);
    }
    return result;
  }
}
