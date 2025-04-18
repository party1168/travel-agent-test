import { Controller, Get, Param } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightResponseDTO } from './flight.dto';

@Controller('flight')
export class FlightController {
  private readonly flightService: FlightService;
  constructor(flightService: FlightService) {
    this.flightService = flightService;
  }
  @Get(':origin')
  async getFlight(@Param('origin') origin: string): Promise<FlightResponseDTO> {
    return await this.flightService.getFlight(origin);
  }
}
