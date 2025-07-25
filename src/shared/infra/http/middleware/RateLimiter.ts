import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import AppError from '../../../errors/AppError';

const limiter = new RateLimiterMemory({
  points: 1,      // número de requisições
  duration: 1,      // por segundo
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip!);
    return next();
  } catch (err) {
    throw new AppError('Muitas requisições.', 429);
  }
}
