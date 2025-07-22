import * as yup from 'yup';
import { validation } from '../../../shared/middleware/validation';
import { IQueryProps } from '../domain/interfaces/IQueryProps';
import { FilterTimes } from '../domain/enums/FilterTimes';
import { StateType } from '../domain/enums/StateType';
import { bankOptions } from '../../Bank/domain/enums/Banks';
import { TypeRequest } from '../domain/enums/TypeRequest';

interface IParamsSchema {
  bank?: bankOptions;
  type?: TypeRequest;
}

// Helper para criar um schema yup para enums
const enumSchema = <T extends object>(enumObj: T) =>
  yup.mixed<any>().oneOf(Object.values(enumObj));

const querySchema = yup.object().shape({
  filter: enumSchema(FilterTimes).optional(),
  status: enumSchema(StateType).optional(),
});

const paramsSchema = yup.object().shape({
  bank: enumSchema(bankOptions).required(),
  type: enumSchema(TypeRequest).required(),
});

export const getRecordsValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(querySchema),
  params: getSchema<IParamsSchema>(paramsSchema),
}));
