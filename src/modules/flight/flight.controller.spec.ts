import { Test, TestingModule } from '@nestjs/testing';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FlightResponseDTO, GetFlightDTO } from './flight.dto';

describe('FlightController', () => {
  let controller: FlightController;
  let flightService: FlightService;

  const mockFlightResponse: FlightResponseDTO = {
    data: [
      {
        type: 'flight-destination',
        origin: 'MAD',
        destination: 'JFK',
        departureDate: '2023-05-01',
        returnDate: '2023-05-10',
        price: { total: '100' },
        links: {
          flightDates: 'string',
          flightOffers: 'string',
        },
      },
    ],
    dictionaries: {
      currencies: {
        EUR: 'Euro',
      },
      locations: {
        JFK: {
          subType: 'AIRPORT',
          detailedName: 'John F. Kennedy International Airport',
        },
      },
    },
    meta: {
      currency: 'EUR',
      links: {
        self: 'string',
      },
      defaults: {
        departureDate: '2023-05-01',
        duration: 'string',
      },
    },
  };

  const mockFlightService = {
    getFlight: () => Promise.resolve(mockFlightResponse),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightController],
      providers: [
        {
          provide: FlightService,
          useValue: mockFlightService,
        },
      ],
    }).compile();

    controller = module.get<FlightController>(FlightController);
    flightService = module.get<FlightService>(FlightService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call flightService.getFlight with correct parameters', async () => {
    const queryParams: GetFlightDTO = {
      origin: 'NYC',
      departureDate: '2023-05-01',
    };
    const getFlightSpy = jest
      .spyOn(flightService, 'getFlight')
      .mockImplementation(() => Promise.resolve(mockFlightResponse));
    await controller.getFlight(queryParams);
    expect(getFlightSpy).toHaveBeenCalledWith(queryParams);
  });

  it('should return flight data from flightService', async () => {
    const queryParams: GetFlightDTO = {
      origin: 'NYC',
      departureDate: '2023-05-01',
    };
    const result = await controller.getFlight(queryParams);
    expect(result).toEqual(mockFlightResponse);
  });
});
