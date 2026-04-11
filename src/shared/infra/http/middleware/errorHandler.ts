import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

export default function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error('Unexpected error:', error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
