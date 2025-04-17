import { Controller, Get, Param } from '@nestjs/common';
import { FlightService } from './flight.service';
import { IFlightResponse } from './flight.interface';

@Controller('flight')
export class FlightController {
  private readonly flightService: FlightService;
  constructor(flightService: FlightService) {
    this.flightService = flightService;
  }
  @Get(':origin')
  async getFlight(@Param('origin') origin: string): Promise<IFlightResponse> {
    return await this.flightService.getFlight(origin);
  }
}
