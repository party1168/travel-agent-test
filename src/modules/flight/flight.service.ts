import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { AuthTokenDTO, FlightResponseDTO, GetFlightDTO } from './flight.dto';
import axios from 'axios';

@Injectable()
export class FlightService {
  private readonly baseUrl: string;
  private readonly authUrl: string;
  private readonly apiKey: string;
  private readonly apiSecret: string;
  constructor(private configService: ConfigService) {
    this.baseUrl = 'test.api.amadeus.com/v1';
    this.authUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
    this.apiKey = this.configService.get<string>('AMADEUS_CLIENT_ID') as string;
    this.apiSecret = this.configService.get<string>(
      'AMADEUS_CLIENT_SECRET',
    ) as string;
  }
  async getFlight(getFlightDto: GetFlightDTO): Promise<FlightResponseDTO> {
    const token = await this.getAccessToken();
    try {
      const res = await axios
        .get<FlightResponseDTO>(
          `https://${this.baseUrl}/shopping/flight-destinations`,
          {
            headers: { Authorization: token },
            params: {
              ...getFlightDto,
            },
          },
        )
        .catch((err) => {
          if (axios.isAxiosError(err)) {
            const error = err as AxiosError;
            const statusCode = error.response?.status;
            const errorMessage = error.response?.data;

            throw new Error(`Error ${statusCode}: ${String(errorMessage)}`);
          } else {
            throw new Error('An unexpected error occurred');
          }
        });
      if (!res.data) {
        throw new Error('Failed to get flight data');
      }
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  private async getAccessToken(): Promise<string> {
    const token = await axios.post<AuthTokenDTO>(
      this.authUrl,
      {
        grant_type: 'client_credentials',
        client_id: this.apiKey,
        client_secret: this.apiSecret,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    if (!token) {
      throw new Error('Failed to get token');
    }
    return `${token.data.token_type} ${token.data.access_token}`;
  }
}
