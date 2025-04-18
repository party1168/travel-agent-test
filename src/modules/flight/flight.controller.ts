import { Controller, Get, Query } from '@nestjs/common';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightResponseDTO, GetFlightDTO } from './flight.dto';

@Controller('flight')
export class FlightController {
  private readonly flightService: FlightService;
  constructor(flightService: FlightService) {
    this.flightService = flightService;
  }
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('search')
  async getFlight(@Query() query: GetFlightDTO): Promise<FlightResponseDTO> {
    return await this.flightService.getFlight(query);
  }
}
