import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { ENV } from '../config/env';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(`[Error] ${err.message}`);
  
  const statusCode = err.status || 500;
  const message = ENV.NODE_ENV === 'development' 
    ? err.message 
    : 'Terjadi kesalahan pada server';

  sendError(res, message, statusCode);
};