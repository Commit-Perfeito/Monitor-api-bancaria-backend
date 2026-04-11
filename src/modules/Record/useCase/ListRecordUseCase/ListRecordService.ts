import { container, inject, injectable } from 'tsyringe';
import IRecordRepository from '../../domain/repositories/IRecordRepository';
import { parseDate } from '../../../../shared/utils/ParseDate';
import { IRecord } from '../../domain/models/IRecord';
import AppError from '@shared/errors/AppError';
import IBankRepository from '@modules/Bank/domain/repositories/IBankRepository';
import { ICacheProvider } from '@shared/providers/cache/models/ICacheProvider';

@injectable()
export class ListAllWithSearchTime {
  constructor(
    @inject('RecordRepository')
    private RecordRepository: IRecordRepository,
    @inject('bankRepository')
    private bankRepository: IBankRepository,
    @inject('cacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  async execute(
    bank: string,
    type: string,
    startDateStr: string,
    endDateStr: string,
    status: string
  ): Promise<IRecord[]> {
    {
      let products = await this.cacheProvider.recover<IRecord[]>(
        'monitor-RECORD_LIST'
      );

      if (products) {
        return products;
      }
      // Busca o banco pelo nome para obter o ID
      const banco = await this.bankRepository.listBankByName(bank);

      if (!banco) {
        throw new AppError('Banco não existe');
      }
      const bankId = banco.id;

      // Converte strings de data para objetos Date no formato interno esperado
      const startDate = parseDate(startDateStr);
      const endDate = parseDate(endDateStr);
      // const limit = 2; // Limite fixo para consulta por status

      // Busca registros filtrando pelo status, se fornecido
      const records = await this.RecordRepository.ListRecordsBetween(
        bankId,
        type,
        startDate,
        endDate,
        status
      );

      // Se não houver registros, retorna array vazio
      if (!Array.isArray(records) || records.length === 0) return [];

      if (records.length > 0) {
        await this.cacheProvider.save('monitor-RECORD_LIST', records);
      }
      return records;
      // Formata os dados para retorno à API
      // return records.map((record) => ({
      //   Tipo: record.type,
      //   CodigoDaResposta: record.codeResponse,
      //   Banco: record.bank,
      //   HoraDaConsulta: record.dateCreated,
      //   Status: record.status,
      //   TempoDeResposta: `${record.timeRequest}`,
      //   PayloadResponse: record.payloadResponse,
      //   Detalhamento: record.detailing,
      //   StatusDaResposta: record.responseStatus,
      // }));
    }
  }
}
