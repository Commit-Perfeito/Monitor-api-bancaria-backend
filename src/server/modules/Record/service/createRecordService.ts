import { inject, injectable } from 'tsyringe';
import { PositiveCodeRequest } from '../../../shared/enums/PositiveCodeRequest';
import { ConvertResponseStatus } from '../../../shared/utils/ConvertResponseStatus';
import { getHttpStatusText } from '../../../shared/utils/GetHttpStatusText';
import IRecordRepository from '../domain/repositories/IRecordRepository';
import { ICreateRecord } from '../domain/interfaces/ICreateRecord';
import { getBankByNameService } from '../../Bank/services/getBankByNameService';
import { IRecord } from '../domain/models/IRecord';
import AppError from '../../../shared/errors/AppError';

@injectable()
export class createRecordService {
  constructor(
    @inject('RecordRepository')
    private recordRepository: IRecordRepository,
    @inject('BankRepository')
    private bankService: getBankByNameService
  ) {

  }
  async execute(info: ICreateRecord, bankName: string): Promise<IRecord> {
    const { codeResponse, type, timeReq, payload } = info;

    const bank = await this.bankService.execute(bankName);

    if (!bank) {
      throw new AppError('Não há nenhum banco com esse nome!')
    }

    const isPositiveCode = Object.values(PositiveCodeRequest).includes(
      Number(codeResponse)
    );
    const status = isPositiveCode
      ? 'ativo'
      : 'inativo';

    const detailing = await getHttpStatusText(Number(codeResponse));

    const responseTime = await ConvertResponseStatus(timeReq, status);

    const record = await this.recordRepository.CreateRecord(
      type,
      codeResponse,
      status,
      timeReq,
      payload,
      bank,
      detailing,
      responseTime
    );
    return record
  }
}
