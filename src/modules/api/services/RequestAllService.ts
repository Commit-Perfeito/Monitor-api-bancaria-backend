import { container, inject, injectable } from "tsyringe";
import { CedenteInterface } from "../models/interfaces/CedenteInterface";
import { convert_Env } from "../../../shared/utils/ConvertEnvToJSON";
import { ConvertCedenteForRecord } from "../models/utils/ConvertCedenteforObject";
import { IBank } from "../../Bank/domain/models/IBank";
import { ICreateRecord } from "../../Record/domain/models/ICreateRecord";
import { RegistroBoleto } from "../requests/Registro/RegistroBoletoAPI";
import { ConsultaBoleto } from "../requests/Consulta/ConsultaBoletoAPI";
import { CreateRecordService } from "../../Record/services/CreateRecordService";
import { FindBankByName } from "../../Bank/services/FindBankByNameService";

@injectable()
export default class RequestAllService {

  constructor(
    @inject(FindBankByName)
    private findBankByName: FindBankByName,
    @inject(CreateRecordService)
    private createRecordService: CreateRecordService
  ) {
  }

  async execute(envList: string[]) {
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

        await this.createRecordService.execute(registro);
        await this.createRecordService.execute(consulta);
      } catch (error: any) {
        // mesmo com erro salvar no banco
        const bank = await this.findBankByName.execute(cedente.NOME_BANCO)

        if (!bank) {
          throw new Error(`Banco não encontrado: ${cedente.NOME_BANCO}`)
        }

        const record: ICreateRecord = {
          bankId: bank.id!,
          codeResponse: error.code,
          payload: error.data,
          timeReq: 0,
          type:
            error.method === 'REGISTRO'
              ? 'REGISTRO'
              : 'CONSULTA',
          // detailing: error.code,
        };

        await this.createRecordService.execute(record);

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
} 
