import { IBank } from '../models/IBank'

export default interface IBankRepository {
    ListBankByName(bank: string): Promise<IBank | null>;
    findBankBycode(bankCode: number): Promise<IBank | null>;
}