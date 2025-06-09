import { PositiveCodeRequest } from '../../../shared/enums/PositiveCodeRequest';
import { ConvertResponseStatus } from '../../../shared/utils/ConvertResponseStatus';
import { getHttpStatusText } from '../../../shared/utils/GetHttpStatusText';
import { getBankByNameService } from '../../Bank/service/getBankByNameService';
import { StateType } from '../enums/StateType';
import { ICreateRecord } from '../interfaces/ICreateRecord';
import { RecordRepository } from '../repository/RecordRepository';

export class createRecordsService {
  private bankService = new getBankByNameService();

  async execute(info: ICreateRecord, bankName: string): Promise<void> {
    const { codeResponse, type, timeReq, payload } = info;

    // Busca banco pelo nome
    const bank = await this.bankService.execute(bankName);

    // Descobre status baseado no código de resposta
    const isPositiveCode = Object.values(PositiveCodeRequest).includes(
      Number(codeResponse)
    );
    const status: StateType = isPositiveCode
      ? StateType.ativo
      : StateType.inativo;

    // Detalhamento do código HTTP
    const detailing = await getHttpStatusText(Number(codeResponse));

    // Tempo de resposta classificado
    const responseTime = await ConvertResponseStatus(timeReq, status);

    // Cria o registro
    await RecordRepository.CreateRecord(
      type,
      codeResponse,
      status,
      timeReq,
      payload,
      bank,
      detailing,
      responseTime
    );
  }
}
