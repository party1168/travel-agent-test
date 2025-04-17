import { Controller, Get } from '@nestjs/common';
import { FlightService } from './flight.service';

@Controller('flight')
export class FlightController {
  private readonly flightService: FlightService;
  constructor(flightService: FlightService) {
    this.flightService = flightService;
  }
  @Get()
  getFlight(): string {
    return this.flightService.getFlight();
  }
}
