import * as yup from 'yup';
import { bankOptions } from '@modules/Bank/domain/enums/Banks';
import { FilterTimes } from '@modules/Record/domain/enums/FilterTimes';
import { StateType } from '@modules/Record/domain/enums/StateType';
import { TypeRequest } from '@modules/Record/domain/enums/TypeRequest';
import { IQueryProps } from '@modules/Record/domain/interfaces/IQueryProps';
import { validation } from '@shared/infra/http/middleware/validation';

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
