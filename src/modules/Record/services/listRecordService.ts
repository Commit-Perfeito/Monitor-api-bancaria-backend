import { container, inject, injectable } from 'tsyringe';
import IRecordRepository from '../domain/repositories/IRecordRepository';
import { findBankByName } from '../../Bank/services/FindBankByNameService';
import { parseDate } from '../../../shared/utils/ParseDate';
import { IRecord } from '../domain/models/IRecord';

@injectable()
export class ListAllWithSearchTime {

  constructor(
    @inject('RecordRepository')
    private RecordRepository: IRecordRepository,
    @inject(findBankByName)
    private findBankByName: findBankByName,
  ) { }

  async execute(
    bank: string,
    type: string,
    startDateStr: string,
    endDateStr: string,
    status: string
  ): Promise<IRecord[]> {
    {

      // Busca o banco pelo nome para obter o ID
      const banco = await this.findBankByName.execute(bank);
      const bankId = banco.id;

      // Converte strings de data para objetos Date no formato interno esperado
      const startDate = parseDate(startDateStr);
      const endDate = parseDate(endDateStr);
      // const limit = 2; // Limite fixo para consulta por status

      // Busca registros filtrando pelo status, se fornecido
      const result = await this.RecordRepository.ListRecordsBetween(
        bankId,
        type,
        startDate,
        endDate,
        status
      )

      // Se não houver registros, retorna array vazio
      if (!Array.isArray(result) || result.length === 0) return [];

      return result
      // Formata os dados para retorno à API
      // return result.map((record) => ({
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
