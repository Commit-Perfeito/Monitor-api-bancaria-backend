import { inject, injectable } from 'tsyringe';
import { CedenteInterface } from '../domain/interfaces/CedenteInterface';
import { convert_Env } from '../../../shared/utils/ConvertEnvToJSON';
import { ConvertCedenteForRecord } from '../domain/utils/ConvertCedenteforObject';
import { ICreateRecord } from '../../Record/domain/models/ICreateRecord';
import { FindBankByName } from '../../Bank/services/FindBankByNameService';
import ConsultaBoletoService from './ConsultaBoletoService';
import RegistroBoletoService from './ConsultaBoletoService';
import { CreateRecordService } from '@modules/Record/useCase/CreateRecordUseCase/CreateRecordService';

@injectable()
export default class RequestAllService {
  private consulta: ConsultaBoletoService;
  private registro: RegistroBoletoService;
  constructor(
    @inject(FindBankByName)
    private findBankByName: FindBankByName,
    @inject(CreateRecordService)
    private createRecordService: CreateRecordService
  ) {
    this.consulta = new ConsultaBoletoService();
    this.registro = new RegistroBoletoService();
  }

  async execute(envList: string[]) {
    let errorsCount = 0;

    for (const bankKey of envList) {
      const dotenv = process.env[bankKey];
      const cedente: CedenteInterface = await convert_Env(dotenv);

      try {
        const [registerResult, consultResult] = await Promise.all([
          this.consulta.execute(cedente),
          this.registro.execute(cedente),
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
        const bank = await this.findBankByName.execute(cedente.NOME_BANCO);

        if (!bank) {
          throw new Error(`Banco não encontrado: ${cedente.NOME_BANCO}`);
        }

        const record: ICreateRecord = {
          bankId: bank.id!,
          codeResponse: error.code,
          payload: error.data,
          timeReq: 0,
          type: error.method === 'REGISTRO' ? 'REGISTRO' : 'CONSULTA',
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
  }
}
