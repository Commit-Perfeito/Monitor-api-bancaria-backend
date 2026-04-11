import { IBank } from '../../../Bank/domain/models/IBank';

export interface IRecord {
  id: number;
  type: string;
  codeResponse: number;
  bank: IBank;
  dateCreated: Date;
  status: string;
  timeRequest: number;
  payloadResponse: object;
  detailing: string;
  responseStatus: string;

  year?: number | null;
  month?: number | null;
  day?: number | null;
  hour?: number | null;
  minute?: number | null;
  second?: number | null;
}
