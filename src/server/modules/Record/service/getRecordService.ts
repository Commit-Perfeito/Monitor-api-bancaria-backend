import { formatarDataParaBrasil } from '../../../shared/utils/ConvertData';
import { container, inject, injectable } from 'tsyringe';
import IRecordRepository from '../domain/repositories/IRecordRepository';
import { getBankByNameService } from '../../Bank/services/getBankByNameService';
import { parseDate } from '../../../shared/utils/ParseDate';

@injectable()
export class GetRecordsService {
  private bankService: getBankByNameService;

  constructor(
    @inject('RecordRepository')
    private recordRepository: IRecordRepository
  ) {
    this.bankService = container.resolve(getBankByNameService)
  }

  async execute(bankName: string, type: string, filter?: string, status?: string) {
    const now = new Date();
    const banco = await this.bankService.execute(bankName);
    const bankId = banco.id;


    // Calcula intervalo de datas com base no filtro
    const endDate = parseDate(now.toString());
    const startDate = { ...endDate };

    let limit = 0;

    switch (filter) {
      case 'DAY':
        startDate.day -= 1;
        break;
      case 'WEEK':
        startDate.day -= 7;
        break;
      case 'MOUTH':
        startDate.month -= 1;
        break;
      case 'LAST':
        limit = 1;
        break;
      default:
        break;
    }

    const result = await this.getRecordsByParams(
      bankId,
      type,
      startDate,
      endDate,
      limit,
      status,
      filter
    );

    if (Array.isArray(result) && result.length > 0) {
      return result.map((record) => ({
        Tipo: record.type,
        CodigoDaResposta: record.codeResponse,
        Banco: record.bank,
        HoraDaConsulta: formatarDataParaBrasil(new Date(record.dateCreated)),
        Status: record.status,
        TempoDeResposta: `${record.timeRequest} Milissegundos`,
        PayloadResponse: record.payloadResponse,
        Detalhamento: record.detailing,
        StatusDaResposta: record.responseStatus,
      }));
    }

    return [];
  }

  private async getRecordsByParams(
    bankId: number,
    type: string,
    startDate: any,
    endDate: any,
    limit: number,
    status?: string,
    filter?: string
  ) {
    if (filter === 'LAST') {
      return await this.recordRepository.ListRecordsByStatus(bankId, type, limit, status);
    }
    return await this.recordRepository.ListRecordsBetween(
      bankId,
      type,
      startDate,
      endDate,
      status
    );
  }
}
