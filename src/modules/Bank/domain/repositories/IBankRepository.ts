import { IBank } from '../models/IBank'

export default interface IBankRepository {
  listBankByName(bank: string): Promise<IBank | undefined | null>;
  findBankBycode(bankCode: number): Promise<IBank | undefined | null>;
  findById(id: number): Promise<IBank | null | undefined>;
  list(): Promise<IBank[]>
}