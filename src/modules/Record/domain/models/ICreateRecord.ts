import { TypeRequest } from '../enums/TypeRequest';

export interface ICreateRecord {
  timeReq: number;
  type: string;
  codeResponse: number;
  payload: object;
  bankId: number;
  detailing?: string
}
