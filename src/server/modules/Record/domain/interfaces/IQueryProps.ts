import { FilterTimes } from '../enums/FilterTimes';
import { StateType } from '../enums/StateType';

export interface IQueryProps {
  filter?: FilterTimes;
  state?: StateType;
}
