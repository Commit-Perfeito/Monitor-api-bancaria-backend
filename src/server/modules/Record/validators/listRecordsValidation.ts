import * as yup from 'yup';
import { validation } from '../../../shared/middleware/validation';
import { StateType } from '../domain/enums/StateType';
import { TypeRequest } from '../domain/enums/TypeRequest';
import { bankOptions } from '../../Bank/domain/enums/Banks';

interface IBodyListSchema {
  startDate: string;
  endDate: string;
  type: TypeRequest;
  bank: bankOptions;
  status?: StateType;
}

// Helper para enums
const enumSchema = <T extends object>(enumObj: T) =>
  yup.mixed<any>().oneOf(Object.values(enumObj));

// Validador para data (string com formatos aceitos)
const dateSchema = yup
  .string()
  .required()
  .matches(
    /^(?:\d{4}-\d{2}-\d{2}|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})$/,
    'deve ser no formato YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss.'
  )
  .test('is-valid-date', 'deve ser uma data válida.', (value) => {
    if (!value) return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
  });

// Schema principal
const bodySchema = yup.object({
  status: enumSchema(StateType).optional(),
  type: enumSchema(TypeRequest).defined(),
  startDate: dateSchema.defined().label('startDate'),
  endDate: dateSchema.defined().label('endDate'),
  bank: enumSchema(bankOptions).defined(),
}) as yup.ObjectSchema<IBodyListSchema>;

export const listRecordValidation = validation((getSchema) => ({
  body: getSchema<IBodyListSchema>(bodySchema),
}));
