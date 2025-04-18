import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  use(req: Request, res: Response, next: () => void) {
    this.logger.log(`Request... Method:${req.method} Url:${req.originalUrl}`);
    next();
  }
}
