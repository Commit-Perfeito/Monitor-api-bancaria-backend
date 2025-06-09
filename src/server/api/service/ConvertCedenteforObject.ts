import { getBankByNameService } from '../../modules/Bank/service/getBankByNameService';
import { TypeRequest } from '../../modules/Record/enums/TypeRequest';
import { ICreateRecord } from '../../modules/Record/interfaces/ICreateRecord';
import { ApiBodyInterface } from '../interfaces/ApiBodyInterface';

// Função para converter o cedente em objeto para salvar no banco de dados
export const ConvertCedenteForRecord = async (
  corpoRegistro: ApiBodyInterface,
  banco: string
): Promise<ICreateRecord> => {
  const bankService = new getBankByNameService();
  const bank = await bankService.execute(banco);

  const type =
    corpoRegistro.type === 'consulta'
      ? TypeRequest.CONSULTA
      : TypeRequest.REGISTRO;

  return {
    bancoCode: bank.bankCode,
    type,
    timeReq: Number(corpoRegistro.TempoReq),
    codeResponse: corpoRegistro.codeResponse,
    payload: corpoRegistro.payload,
  };
};
