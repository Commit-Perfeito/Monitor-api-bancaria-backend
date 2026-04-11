import 'reflect-metadata';
import { ListRecordService } from '@modules/Record/useCases/listRecord/listRecord.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListRecordController } from '@modules/Record/useCases/listRecord/listRecord.controller';
import { IRecord } from '@modules/Record/domain/models/IRecord';

jest.mock('tsyringe', () => {
  const actual = jest.requireActual('tsyringe');
  return {
    ...actual,
    container: {
      ...actual.container,
      resolve: jest.fn(),
    },
  };
});

describe('RecordController - ListAllWithSearchTime', () => {
  let request: Partial<Request>;
  let response: Partial<Response>;
  let listAllWithSearchTimeMock: jest.Mocked<ListRecordService>;

  beforeEach(() => {
    listAllWithSearchTimeMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<ListRecordService>;

    // configura o container.resolve para retornar nosso mock
    (container.resolve as jest.Mock).mockReturnValue(listAllWithSearchTimeMock);

    request = {
      body: {
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        status: 'normal',
        type: 'boleto',
        bank: 'BANCO_DO_BRASIL',
      },
    };

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('deve retornar registros com status 200', async () => {
    const fakeRecords: IRecord[] = [];
    fakeRecords.push({
      id: 1266,
      type: 'consulta',
      codeResponse: 200,
      status: 'ativo',
      timeRequest: 203,
      payloadResponse: {},
      detailing: 'Success',
      responseStatus: 'Normal',
      year: 2025,
      month: 7,
      day: 24,
      hour: 16,
      minute: 27,
      second: 7,
      dateCreated: new Date(),
      bank: {
        id: 1,
        name: 'BANCODOBRASIL_V2',
        bankCode: 1,
      },
    });

    listAllWithSearchTimeMock.execute.mockResolvedValue(fakeRecords);

    const controller = new ListRecordController();
    await controller.handle(request as Request, response as Response);

    expect(container.resolve).toHaveBeenCalledWith(ListRecordService);
    expect(listAllWithSearchTimeMock.execute).toHaveBeenCalledWith(
      'BANCO_DO_BRASIL',
      'boleto',
      '2023-01-01',
      '2023-12-31',
      'normal'
    );
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(fakeRecords);
  });
});
