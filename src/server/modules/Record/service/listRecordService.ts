import { formatarDataParaBrasil } from '../../../shared/utils/ConvertData';
import { parseDate } from '../../../shared/utils/ParseDate';
import { bankOptions } from '../../Bank/enums/Banks';
import { getBankByNameService } from '../../Bank/service/getBankByNameService';
import { StateType } from '../enums/StateType';
import { TypeRequest } from '../enums/TypeRequest';
import { RecordRepository } from '../repository/RecordRepository';

export class listRecordService {
  // Serviço para buscar informações do banco pelo nome
  private bankService = new getBankByNameService();

  async execute(
    bank: bankOptions,
    type: TypeRequest,
    startDateStr: string,
    endDateStr: string,
    status?: StateType
  ) {
    // Busca o banco pelo nome para obter o ID
    const banco = await this.bankService.execute(bank);
    const bankId = banco.id;

    // Converte strings de data para objetos Date no formato interno esperado
    const startDate = parseDate(startDateStr);
    const endDate = parseDate(endDateStr);
    const limit = 2; // Limite fixo para consulta por status

    // Busca registros filtrando pelo status, se fornecido
    const result =
      status === undefined
        ? await RecordRepository.ListRecordsBetween(
            bankId,
            type,
            startDate,
            endDate
          )
        : await RecordRepository.ListRecordsByStatus(
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
