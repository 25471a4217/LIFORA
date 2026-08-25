import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  const code = err.code || 'SERVER_ERROR';

  req.log?.error(err);

  res.status(status).json({
    success: false,
    error: {
      code,
      message,
    },
  });
}
