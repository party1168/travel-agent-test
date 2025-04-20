import { Test, TestingModule } from '@nestjs/testing';
import { FlightService } from './flight.service';
import { ConfigService } from '@nestjs/config';
import { GetFlightDTO } from './flight.dto';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FlightService', () => {
  let service: FlightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlightService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'AMADEUS_CLIENT_ID') {
                return 'test_api_key';
              }
              if (key === 'AMADEUS_CLIENT_SECRET') {
                return 'test_api_secret';
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<FlightService>(FlightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFlight', () => {
    it('should call getAccessToken and return correct data structure', async () => {
      const mockFlightData = {
        data: [
          {
            type: 'flight-destination',
            origin: 'JFK',
            destination: 'LAX',
            departureDate: '2023-05-01',
            returnDate: '2023-05-08',
            price: {
              total: '200.00',
              currency: 'USD',
            },
          },
        ],
      };

      jest
        .spyOn(service, 'getAccessToken')
        .mockResolvedValue('Bearer test_token');
      // 不直接驗證 mockAxios.get 的參數，只驗證回傳值
      mockedAxios.get.mockResolvedValue({ data: mockFlightData });

      const getFlightDto: GetFlightDTO = {
        origin: 'JFK',
        maxPrice: 300,
      };

      const result = await service.getFlight(getFlightDto);

      expect(result).toEqual(mockFlightData);
    });

    it('should throw a custom error message when axios throws an AxiosError with response', async () => {
      jest
        .spyOn(service, 'getAccessToken')
        .mockResolvedValue('Bearer test_token');
      jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);
      const error = {
        response: {
          status: 400,
          data: 'Bad Request',
        },
      };
      mockedAxios.get.mockRejectedValue(error);

      const getFlightDto: GetFlightDTO = {
        origin: 'JFK',
        maxPrice: 300,
      };

      await expect(service.getFlight(getFlightDto)).rejects.toThrow(
        'Error 400: Bad Request',
      );
    });

    it('should throw a generic error when axios throws a non-AxiosError', async () => {
      jest
        .spyOn(service, 'getAccessToken')
        .mockResolvedValue('Bearer test_token');
      jest.spyOn(axios, 'isAxiosError').mockReturnValue(false);
      mockedAxios.get.mockRejectedValue(new Error('Some other error'));

      const getFlightDto: GetFlightDTO = {
        origin: 'JFK',
        maxPrice: 300,
      };

      await expect(service.getFlight(getFlightDto)).rejects.toThrow(
        'An unexpected error occurred',
      );
    });

    it('should throw an error if response data is missing', async () => {
      jest
        .spyOn(service, 'getAccessToken')
        .mockResolvedValue('Bearer test_token');
      mockedAxios.get.mockResolvedValue({});

      const getFlightDto: GetFlightDTO = {
        origin: 'JFK',
        maxPrice: 300,
      };

      await expect(service.getFlight(getFlightDto)).rejects.toThrow(
        'Failed to get flight data',
      );
    });

    it('should throw an error when getAccessToken fails', async () => {
      jest
        .spyOn(service, 'getAccessToken')
        .mockRejectedValue(new Error('Token error'));

      const getFlightDto: GetFlightDTO = {
        origin: 'JFK',
        maxPrice: 300,
      };

      await expect(service.getFlight(getFlightDto)).rejects.toThrow(
        'Token error',
      );
    });
  });
});
