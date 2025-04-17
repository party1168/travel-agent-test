import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAuthToken, IFlightResponse } from './flight.interface';
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
  async getFlight(
    origin: string,
    departureDate?: string,
    oneWay: boolean = false,
    duration?: string,
    nonStop: boolean = false,
    maxPrice?: number,
    viewBy: string = 'COUNTRY',
  ): Promise<IFlightResponse> {
    const token = await this.getAccessToken();
    const res = await axios.get<IFlightResponse>(
      `https://${this.baseUrl}/shopping/flight-destinations`,
      {
        headers: { Authorization: token },
        params: {
          origin,
          oneWay,
          nonStop,
          viewBy,
          departureDate,
          duration,
          maxPrice,
        },
      },
    );
    if (!res.data) {
      throw new Error('Failed to get flight data');
    }
    return res.data;
  }

  private async getAccessToken(): Promise<string> {
    const token = await axios.post<IAuthToken>(
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
