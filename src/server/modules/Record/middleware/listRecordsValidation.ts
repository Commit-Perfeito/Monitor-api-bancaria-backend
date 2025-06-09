import * as yup from 'yup'; // Biblioteca para validação de dados

import { TypeRequest } from '../enums/TypeRequest';
import { bankOptions } from '../../Bank/enums/Banks';
import { StateType } from '../enums/StateType';
import { IBodyListSchema } from '../schemas/IBodyListSchema';
import { validation } from '../../../shared/middleware/validation';

// Validador para requisições de listagem de registros
export const listRecordValidation = validation((getSchema) => ({
  // Valida o corpo da requisição conforme o schema definido abaixo
  body: getSchema<IBodyListSchema>(
    yup.object().shape({
      // status é opcional e deve ser um valor válido do enum StateType
      status: yup.mixed<StateType>().oneOf(Object.values(StateType)).optional(),
      // type é obrigatório e deve ser um valor válido do enum TypeRequest
      type: yup
        .mixed<TypeRequest>()
        .oneOf(Object.values(TypeRequest))
        .required(),
      // startDate é obrigatório e deve ser uma string no formato correto de data
      startDate: yup
        .string()
        .required('startDate é obrigatório')
        .matches(
          /^(?:\d{4}-\d{2}-\d{2}|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})$/,
          'startDate deve ser no formato YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss.'
        )
        // Testa se a data é válida criando um objeto Date
        .test(
          'is-valid-date',
          'startDate deve ser uma data válida.',
          (value) => {
            const date = new Date(value);
            return !isNaN(date.getTime());
          }
        ),
      // endDate segue mesma lógica que startDate
      endDate: yup
        .string()
        .required('endDate é obrigatório')
        .matches(
          /^(?:\d{4}-\d{2}-\d{2}|\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})$/,
          'endDate deve ser no formato YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss.'
        )
        .test('is-valid-date', 'endDate deve ser uma data válida.', (value) => {
          const date = new Date(value);
          return !isNaN(date.getTime());
        }),
      // bank é obrigatório e deve ser um valor válido do enum bankOptions
      bank: yup
        .mixed<bankOptions>()
        .oneOf(Object.values(bankOptions))
        .required(),
    })
  ),
}));
