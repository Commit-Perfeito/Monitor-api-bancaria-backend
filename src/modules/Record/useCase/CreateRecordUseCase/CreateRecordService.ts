import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { PositiveCodeRequest } from '@modules/api/domain/enums/PositiveCodeRequest';
import IBankRepository from '@modules/Bank/domain/repositories/IBankRepository';
import { FindbankById } from '@modules/Bank/services/FindbankByIdService';
import { ICreateRecord } from '@modules/Record/domain/models/ICreateRecord';
import { IRecord } from '@modules/Record/domain/models/IRecord';
import IRecordRepository from '@modules/Record/domain/repositories/IRecordRepository';
import { ConvertResponseStatus } from '@shared/utils/ConvertResponseStatus';
import { getHttpStatusText } from '@shared/utils/GetHttpStatusText';

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
  async execute({
    timeReq,
    type,
    codeResponse,
    payload,
    bankId,
  }: ICreateRecord): Promise<IRecord> {
    const bank = await this.bankService.execute(bankId);

    if (!bank) {
      throw new AppError('Não há nenhum banco com esse nome!');
    }

    const isPositiveCode = Object.values(PositiveCodeRequest).includes(
      Number(codeResponse)
    );
    const status = isPositiveCode ? 'ativo' : 'inativo';

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
    return record;
  }
}
