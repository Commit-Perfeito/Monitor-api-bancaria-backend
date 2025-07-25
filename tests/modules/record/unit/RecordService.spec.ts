import 'reflect-metadata';
import FakeRecordRepository from "../repositories/FakeRecordRepository"
import FakeBankRepository from '../../bank/repositories/FakeBankRepository';
import AppError from '@shared/errors/AppError';
import { CreateRecordService } from '@modules/Record/services/CreateRecordService';
import { ListAllWithSearchTime } from '@modules/Record/services/listRecordService';
import { IBank } from '@modules/Bank/domain/models/IBank';

let create: CreateRecordService
let listAll: ListAllWithSearchTime
let fakeRecordRepository: FakeRecordRepository
let fakeBankRepository: FakeBankRepository
jest.mock('src/server/modules/Bank/services/FindBankByNameService') // mock automático

describe('get bank By name', () => {
  beforeEach(() => {
    fakeRecordRepository = new FakeRecordRepository()
    fakeBankRepository = new FakeBankRepository()
    create = new CreateRecordService(fakeRecordRepository, fakeBankRepository)
  })
  it('Deve-se criar o registro', async () => {
    const [timeReq, type, codeResponse, payload, bankId] = [500, 'consulta', 200, {}, 1]

    const response = await create.execute({
      timeReq,
      type,
      codeResponse,
      payload,
      bankId
    })
    expect(response.codeResponse).toEqual(codeResponse)
    expect(response.timeRequest).toEqual(timeReq)
    expect(response.type).toEqual(type)
    expect(response.bank.id).toEqual(bankId)
  })
  it('Deve-se criar o registro com erro', async () => {
    const [timeReq, type, codeResponse, payload, bankId] = [200, 'consulta', 500, {}, 1]

    const response = await create.execute({
      timeReq,
      type,
      codeResponse,
      payload,
      bankId
    })
    expect(response.codeResponse).toEqual(codeResponse)
    expect(response.timeRequest).toEqual(timeReq)
    expect(response.type).toEqual(type)
    expect(response.status).toEqual('inativo')
    expect(response.bank.id).toEqual(bankId)
  })
  it('Deve-se retornar erro ao tentar criar um registro com Id inexistente erradas errado', async () => {
    const idBankWrong = 20;
    const [timeReq, type, codeResponse, payload] = [500, 'consulta', 200, {}]


    await expect(create.execute({
      timeReq,
      type,
      codeResponse,
      payload,
      bankId: idBankWrong
    }))
      .rejects
      .toBeInstanceOf(AppError)
  })
})

describe('List All With Search Time', () => {
  beforeEach(async () => {
    fakeRecordRepository = new FakeRecordRepository()
    const bank: IBank =
    {
      id: 1,
      name: 'BANCODOBRASIL_V2',
      bankCode: 1
    }
    fakeRecordRepository.CreateRecord(
      'registro',
      200,
      'ativo',
      500,
      {},
      bank,
      'Sucesss',
      'Normal'
    )
    const mockFindBankByName = {
      execute: jest.fn().mockResolvedValue(bank),
    };


    listAll = new ListAllWithSearchTime(fakeRecordRepository, mockFindBankByName as any)
  })

  it('Deve listar registros entre datas', async () => {
    const startDate = '2025-07-20'
    const endDate = '2999-12-31'
    const type = 'registro'
    const bank = 'BANCODOBRASIL_V2'
    const status = 'ativo'

    const result = await listAll.execute(bank, type, startDate, endDate, status)
    expect(result).toBeInstanceOf(Array)
    expect(result[0]).toHaveProperty('type')
    expect(result[0]).toHaveProperty('bank')
  })

  it('Deve retornar registros por status', async () => {
    const result = await listAll.execute(
      'BANCODOBRASIL_V2',
      'registro',
      '2025-07-20',
      '2099-12-31',
      'ativo'
    )
    expect(result).toBeInstanceOf(Array)
    expect(result[0].status).toEqual('ativo')
  })

  it('Deve retornar array vazio se não houver registros', async () => {
    jest
      .spyOn(fakeRecordRepository, 'ListRecordsBetween')
      .mockResolvedValue([])

    const result = await listAll.execute(
      'BANCODOBRASIL_V3',
      'consulta',
      '2025-01-01',
      '2025-01-02',
      'ativo'
    )

    expect(result).toEqual([])
  })
})
