import { container } from "tsyringe";
import { CedenteInterface } from "../models/interfaces/CedenteInterface";
import { convert_Env } from "../../../shared/utils/ConvertEnvToJSON";
import { ConvertCedenteForRecord } from "../models/utils/ConvertCedenteforObject";
import { IBank } from "../../Bank/domain/models/IBank";
import { ICreateRecord } from "../../Record/domain/models/ICreateRecord";
import { RegistroBoleto } from "../requests/Registro/RegistroBoletoAPI";
import { ConsultaBoleto } from "../requests/Consulta/ConsultaBoletoAPI";
import { createRecordService } from "../../Record/services/CreateRecordService";
import { findBankByName } from "../../Bank/services/FindBankByNameService";

export const ReqAll = async (envList: string[]) => {
  const recordService = container.resolve(createRecordService);
  const bankService = container.resolve(findBankByName);
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

      await recordService.execute(registro);
      await recordService.execute(consulta);
    } catch (error: any) {
      // mesmo com erro salvar no banco
      const bank: IBank = await bankService.execute(cedente.NOME_BANCO)


      const record: ICreateRecord = {
        bankId: bank.id,
        codeResponse: error.code,
        payload: error.data,
        timeReq: 0,
        type:
          error.method === 'REGISTRO'
            ? 'REGISTRO'
            : 'CONSULTA',
        // detailing: error.code,
      };

      await recordService.execute(record);

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
