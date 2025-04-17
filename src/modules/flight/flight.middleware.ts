import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FlightMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Middleware is running...');
    next();
  }
}
