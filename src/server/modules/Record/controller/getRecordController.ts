import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FilterTimes } from '../enums/FilterTimes';
import { StateType } from '../enums/StateType';
import { GetRecordsService } from '../service/getRecordService';
import AppError from '../../../shared/errors/AppError';

export const getRecords = async (req: Request, res: Response) => {
  const service = new GetRecordsService();

  // Monta o DTO
  const data = {
    bankName: req.params.bank,
    type: req.params.type,
    filter: req.query.filter as FilterTimes | undefined,
    status: req.query.status as StateType | undefined,
  };

  try {
    const result = await service.execute(data);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error('Erro ao obter registros:', error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro inesperado ao processar a solicitação.' });
  }
};
