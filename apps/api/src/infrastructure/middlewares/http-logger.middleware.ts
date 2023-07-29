import type { NextFunction, Request, Response } from 'express';

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware<Request, Response> {
  use(req: Request, res: Response, next: NextFunction): void {
    const startTime: number = new Date().getTime();
    res.on('finish', (): void => {
      Logger.verbose(`[${req.method}] ${res.statusCode} ${req.url} - ${new Date().getTime() - startTime}ms`, 'HTTP');
    });
    next();
  }
}
