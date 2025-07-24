import 'reflect-metadata';
import FakeBankRepository from "../repositories/FakeBankRepository"
import AppError from "src/server/shared/errors/AppError"
import { FindbankById } from 'src/server/modules/Bank/services/FindbankByIdService';
import { findBankByName } from 'src/server/modules/Bank/services/FindBankByNameService';


let findById: FindbankById
let getByName: findBankByName
let fakeBankRepository: FakeBankRepository
describe('get bank By id', () => {
    beforeEach(() => {
        fakeBankRepository = new FakeBankRepository()
        findById = new FindbankById(fakeBankRepository)
    })
    it('Deve-se achar o banco pelo nome', async () => {
        const id = 1;

        const response = await findById.execute(id)

        expect(response.id).toEqual(id)
        expect(response.name).toEqual('BANCODOBRASIL_V2')
    })
    it('Deve-se retornar erro ao tentar achar um banco pelo nome errado', async () => {
        const idWrong = 20;

        await expect(findById.execute(idWrong)).rejects.toBeInstanceOf(AppError)
    })
})

describe('get bank By name', () => {
    beforeEach(() => {
        fakeBankRepository = new FakeBankRepository()
        getByName = new findBankByName(fakeBankRepository)
    })
    it('Deve-se achar o banco pelo nome', async () => {
        const name = 'BANCODOBRASIL_V2';

        const response = await getByName.execute(name)

        expect(response.name).toEqual(name)
        expect(response.id).toEqual(1)
        expect(response.name).toEqual('BANCODOBRASIL_V2')
    })
    it('Deve-se retornar erro ao tentar achar um banco pelo nome errado', async () => {
        const nameWrong = 'nubank';

        await expect(getByName.execute(nameWrong)).rejects.toBeInstanceOf(AppError)
    })
})