import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../../shared/errors/AppError';

// service
import { listRecordService } from '../service/listRecordService';

export const listRecords = async (req: Request, res: Response) => {
  const { startDate, endDate, status, type, bank } = req.body;
  const service = new listRecordService(); // Instancia o serviço

  try {
    const result = await service.execute(
      bank,
      type,
      startDate,
      endDate,
      status
    );
    // Retorna os registros com status 200 (OK)
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error('Erro ao obter registros:', error);
    // Verifica se o erro é um erro customizado da aplicação (AppError)
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    } else {
      // Caso erro inesperado
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Erro inesperado ao processar a solicitação.' });
    }
  }
};
