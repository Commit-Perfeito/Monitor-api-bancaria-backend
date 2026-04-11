import { container } from 'tsyringe';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';
import { ICreateRecord } from '../../../Record/domain/models/ICreateRecord';
import { FindBankByName } from '../../../Bank/services/FindBankByNameService';
import { TypeRequest } from '../../../Record/domain/enums/TypeRequest';

// Função para converter o cedente em objeto para salvar no banco de dados
export const ConvertCedenteForRecord = async (
  corpoRegistro: ApiBodyInterface,
  banco: string
): Promise<ICreateRecord> => {
  const bankService = container.resolve(FindBankByName);
  const bank = await bankService.execute(banco);

  const type =
    corpoRegistro.type === 'consulta'
      ? TypeRequest.CONSULTA
      : TypeRequest.REGISTRO;

  return {
    bankId: bank.id,
    type,
    timeReq: Number(corpoRegistro.TempoReq),
    codeResponse: corpoRegistro.codeResponse,
    payload: corpoRegistro.payload,
  };
};
