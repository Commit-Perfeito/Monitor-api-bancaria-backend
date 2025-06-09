import * as yup from 'yup'; // lib de validação
import { validation } from '../../../shared/middleware/validation';
import { bankOptions } from '../../Bank/enums/Banks';
import { FilterTimes } from '../enums/FilterTimes';
import { StateType } from '../enums/StateType';
import { TypeRequest } from '../enums/TypeRequest';
import { IQueryProps } from '../interfaces/IQueryProps';
import { IParamsSchema } from '../schemas/IParamsSchema';

// Validador das requisições de registro
export const getRecordsValidation = validation((getSchema) => ({
  // Faz uma validação dos campos recebidos com os campos que são requeridos no Query
  query: getSchema<IQueryProps>(
    yup.object().shape({
      filter: yup
        .mixed<FilterTimes>()
        .oneOf(Object.values(FilterTimes))
        .optional(),
      status: yup.mixed<StateType>().oneOf(Object.values(StateType)).optional(),
    })
  ),
  // Faz uma validação dos campos recebidos com os campos que são requeridos no Params
  params: getSchema<IParamsSchema>(
    yup.object().shape({
      bank: yup
        .mixed<bankOptions>()
        .oneOf(Object.values(bankOptions))
        .required(),
      type: yup
        .mixed<TypeRequest>()
        .oneOf(Object.values(TypeRequest))
        .required(),
    })
  ),
}));
