import { Injectable } from '@nestjs/common';

@Injectable()
export class FlightService {
  getFlight(): string {
    return 'Flight information';
  }
}
