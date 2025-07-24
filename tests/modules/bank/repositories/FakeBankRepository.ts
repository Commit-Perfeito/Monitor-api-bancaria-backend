import { IBank } from "src/server/modules/Bank/domain/models/IBank";
import IBankRepository from "src/server/modules/Bank/domain/repositories/IBankRepository";
import { Bank } from "src/server/modules/Bank/infra/typeorm/entities/Bank";


export default class FakeBankRepository implements IBankRepository {
    private banks: Bank[] = [
        {
            id: 1,
            name: 'BANCODOBRASIL_V2',
            bankCode: 1,
            records: []
        },
        {
            id: 2,
            name: 'SANTANDER',
            bankCode: 33,
            records: []
        },
        {
            id: 3,
            name: 'BANRISUL',
            bankCode: 41,
            records: []
        },
        {
            id: 4,
            name: 'INTER',
            bankCode: 77,
            records: []
        },
        {
            id: 5,
            name: 'CAIXA',
            bankCode: 104,
            records: []
        },
        {
            id: 6,
            name: 'ITAU_V2',
            bankCode: 341,
            records: []
        },
        {
            id: 7,
            name: 'ITAU_FRANCESA',
            bankCode: 341,
            records: []
        },
        {
            id: 8,
            name: 'SICREDI_V2',
            bankCode: 748,
            records: []
        },
        {
            id: 9,
            name: 'SICREDI_V3',
            bankCode: 748,
            records: []
        },
        {
            id: 10,
            name: 'SICOOB_V2',
            bankCode: 756,
            records: []
        }

    ]

    public async listBankByName(name: string): Promise<IBank | undefined> {
        const bank = this.banks.find((b) => b.name === name)
        return bank;
    }

    public async findBankBycode(code: number): Promise<IBank | undefined> {
        const bank = this.banks.find((b) => b.bankCode === code)
        return bank
    }
    public async findById(id: number): Promise<IBank | undefined> {
        const bank = this.banks.find((b) => b.id === id)
        return bank
    }
}