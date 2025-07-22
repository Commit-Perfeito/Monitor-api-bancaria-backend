import { container } from 'tsyringe';
import { ApiBodyInterface } from '../models/interfaces/ApiBodyInterface';
import { ICreateRecord } from '../../Record/domain/interfaces/ICreateRecord';
import { getBankByNameService } from '../../Bank/services/getBankByNameService';
import { TypeRequest } from '../../Record/domain/enums/TypeRequest';

// Função para converter o cedente em objeto para salvar no banco de dados
export const ConvertCedenteForRecord = async (
  corpoRegistro: ApiBodyInterface,
  banco: string
): Promise<ICreateRecord> => {
  const bankService = container.resolve(getBankByNameService);
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
