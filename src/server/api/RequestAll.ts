import { getBankByCodeService } from '../modules/Bank/service/getBankByCodeService';
import { TypeRequest } from '../modules/Record/enums/TypeRequest';
import { ICreateRecord } from '../modules/Record/interfaces/ICreateRecord';
import { createRecordsService } from '../modules/Record/service/createRecordservice';
import { Bank } from '../shared/database/entities/Bank';
import { convert_Env } from '../shared/utils/ConvertEnvToJSON';
import { ConsultaBoleto } from './Consulta/ConsultaBoletoAPI';
import { CedenteInterface } from './interfaces/CedenteInterface';
import { RegistroBoleto } from './Registro/RegistroBoletoAPI';
import { ConvertCedenteForRecord } from './service/ConvertCedenteforObject';

export const ReqAll = async (envList: string[]) => {
  const recordService = new createRecordsService();
  const bankService = new getBankByCodeService();
  let errorsCount = 0;

  for (const bankKey of envList) {
    const dotenv = process.env[bankKey];
    const cedente: CedenteInterface = await convert_Env(dotenv);

    try {
      const [registerResult, consultResult] = await Promise.all([
        RegistroBoleto(cedente),
        ConsultaBoleto(cedente),
      ]);

      if (registerResult.erro) errorsCount++;
      if (consultResult.erro) errorsCount++;

      const registro = await ConvertCedenteForRecord(
        registerResult,
        cedente.NOME_BANCO
      );
      const consulta = await ConvertCedenteForRecord(
        consultResult,
        cedente.NOME_BANCO
      );

      await recordService.execute(registro, cedente.NOME_BANCO);
      await recordService.execute(consulta, cedente.NOME_BANCO);
    } catch (error: any) {
      // mesmo com erro salvar no banco
      const bank: Bank = await bankService.execute(
        Number(cedente.CEDENTE_CONTA_CODIGO_BANCO)
      );

      const Record: ICreateRecord = {
        bancoCode: bank.bankCode,
        codeResponse: error.code,
        payload: error.data,
        timeReq: 0,
        type:
          error.method === TypeRequest.REGISTRO
            ? TypeRequest.REGISTRO
            : TypeRequest.CONSULTA,
        detailing: error.code,
      };

      await recordService.execute(Record, cedente.NOME_BANCO);

      console.error(
        `Erro ao registrar boleto para o banco: ${cedente.NOME_BANCO}`,
        error.code
      );
      errorsCount++;
    }
  }

  console.log('\n************************\n');
  console.log(`${envList.length} Bancos verificados com sucesso!`);
  console.log(`${errorsCount} Bancos com erro!`);
};
