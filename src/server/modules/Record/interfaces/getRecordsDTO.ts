import { FilterTimes } from '../enums/FilterTimes';
import { StateType } from '../enums/StateType';

export interface GetRecordsDTO {
  bankName: string;
  type: string;
  filter?: FilterTimes;
  status?: StateType;
}
