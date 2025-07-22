import { container, inject, injectable } from 'tsyringe';
import { formatarDataParaBrasil } from '../../../shared/utils/ConvertData';
import IRecordRepository from '../domain/repositories/IRecordRepository';
import { getBankByNameService } from '../../Bank/services/getBankByNameService';
import { parseDate } from '../../../shared/utils/ParseDate';

@injectable()
export class ListAllWithSearchTime {
  constructor(
    @inject('RecordRepository')
    private RecordRepository: IRecordRepository,
  ) { }

  async execute(
    bank: string,
    type: string,
    startDateStr: string,
    endDateStr: string,
    status?: string
  ) {
    {
      const getBankByName = container.resolve(getBankByNameService)
      // Busca o banco pelo nome para obter o ID
      const banco = await getBankByName.execute(bank);
      const bankId = banco.id;

      // Converte strings de data para objetos Date no formato interno esperado
      const startDate = parseDate(startDateStr);
      const endDate = parseDate(endDateStr);
      const limit = 2; // Limite fixo para consulta por status

      // Busca registros filtrando pelo status, se fornecido
      const result =
        status === undefined
          ? await this.RecordRepository.ListRecordsBetween(
            bankId,
            type,
            startDate,
            endDate
          )
          : await this.RecordRepository.ListRecordsByStatus(
            bankId,
            type,
            limit,
            status
          );

      // Se não houver registros, retorna array vazio
      if (!Array.isArray(result) || result.length === 0) return [];

      // Formata os dados para retorno à API
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
  }
}
