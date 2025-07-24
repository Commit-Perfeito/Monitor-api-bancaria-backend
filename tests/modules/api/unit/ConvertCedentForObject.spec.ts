// tests/modules/api/unit/ConvertCedentForObject.spec.ts
import 'reflect-metadata';
import { container } from 'tsyringe';
import FakeBankRepository from '../../bank/repositories/FakeBankRepository';
import { ConvertCedenteForRecord } from 'src/server/modules/api/models/utils/ConvertCedenteforObject';

describe('função converter cedente para objeto', () => {
    beforeEach(() => {
        container.registerSingleton('BankRepository', FakeBankRepository);
    });

    it('Deve retornar o objeto de forma correta', async () => {
        const ApiBodyInterface = {
            TempoReq: '200',
            type: 'consulta',
            codeResponse: 200,
            payload: {
                _meta: {
                    _total: 1,
                    _paginacao: { _proximo: false, _anterior: false },
                    _itens_por_pagina: 20,
                },
                _dados: [
                    {
                        motivo: "Parametro CEP nao pode ser menor que 1 ou ter mais de 8 digitos!",
                        via_ws: false,
                        hibrido: false,
                        protesto: false,
                        situacao: "FALHA",
                        CedenteConta: "123456",
                        CedenteAgencia: "1234",
                        CedenteCodigoBanco: "001",
                        CedenteCarteira: "11",
                        CedenteAgenciaDV: "5",
                        CedenteContaNumeroDV: "7",
                        CedenteNumeroConvenio: "1234567",
                    }
                ],
                _status: "sucesso",
            },
            message: 'Lenta',
            details: 'Success',
            erro: false,
        };

        const convert = await ConvertCedenteForRecord(ApiBodyInterface, 'BANCODOBRASIL_V2');

        expect(convert.codeResponse).toEqual(ApiBodyInterface.codeResponse);
        // expect(convert.payload).toEqual(ApiBodyInterface.payload);
        expect(convert.type).toEqual(ApiBodyInterface.type);
        // expect(convert.timeReq).toEqual(ApiBodyInterface.TempoReq);
        // expect(convert).toEqual(ApiBodyInterface.codeResponse);
        expect(convert).not.toBe(null)
    });
});
