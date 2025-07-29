import { inject, injectable } from 'tsyringe';
import { PositiveCodeRequest } from '../../api/domain/enums/PositiveCodeRequest';
import { ConvertResponseStatus } from '../../../shared/utils/ConvertResponseStatus';
import { getHttpStatusText } from '../../../shared/utils/GetHttpStatusText';
import IRecordRepository from '../domain/repositories/IRecordRepository';
import { ICreateRecord } from '../domain/models/ICreateRecord';
import { IRecord } from '../domain/models/IRecord';
import AppError from '@shared/errors/AppError';
import { FindbankById } from '../../Bank/services/FindbankByIdService';
import IBankRepository from '../../Bank/domain/repositories/IBankRepository';

@injectable()
export class CreateRecordService {
  private bankService: FindbankById;
  constructor(
    @inject('RecordRepository')
    private recordRepository: IRecordRepository,
    @inject('BankRepository')
    private bankRepository: IBankRepository
  ) {
    this.bankService = new FindbankById(this.bankRepository);
  }
  async execute({ timeReq,
    type,
    codeResponse,
    payload,
    bankId }: ICreateRecord): Promise<IRecord> {
    const bank = await this.bankService.execute(bankId);

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
