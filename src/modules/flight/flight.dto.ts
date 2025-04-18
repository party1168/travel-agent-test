import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsObject,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export class AuthTokenDTO {
  @IsNotEmpty()
  @IsString()
  type: string; // Type of the token, e.g., "amadeusOAuth2Token"

  @IsNotEmpty()
  @IsString()
  username: string; // User's email or username

  @IsNotEmpty()
  @IsString()
  application_name: string; // Name of the application

  @IsNotEmpty()
  @IsString()
  client_id: string; // Client ID for authentication

  @IsNotEmpty()
  @IsString()
  token_type: string; // Type of the token, e.g., "Bearer"

  @IsNotEmpty()
  @IsString()
  access_token: string; // The actual access token

  @IsNotEmpty()
  @IsNumber()
  expires_in: number; // Token expiration time in seconds

  @IsNotEmpty()
  @IsString()
  state: string; // State of the token, e.g., "approved"

  @IsNotEmpty()
  @IsString()
  scope: string; // Scope of the token, can be empty
}

export class FlightResponseDTO {
  @IsNotEmpty()
  @IsObject()
  data: FlightDestinationDTO[];

  @IsNotEmpty()
  @IsObject()
  dictionaries: {
    currencies: Record<string, string>;
    locations: Record<string, LocationDetailsDTO>;
  };

  @IsNotEmpty()
  @IsObject()
  meta: {
    currency: string;
    links: {
      self: string;
    };
    defaults: {
      departureDate: string;
      duration: string;
    };
  };
}

export class FlightDestinationDTO {
  @IsNotEmpty()
  @IsString()
  type: string; // e.g., "flight-destination"

  @IsNotEmpty()
  @IsString()
  origin: string; // Origin airport code, e.g., "MAD"

  @IsNotEmpty()
  @IsString()
  destination: string; // Destination airport code, e.g., "OPO"

  @IsNotEmpty()
  @IsString()
  departureDate: string; // Departure date, e.g., "2025-05-30"

  @IsNotEmpty()
  @IsString()
  returnDate: string; // Return date, e.g., "2025-06-14"

  @IsNotEmpty()
  @IsObject()
  price: {
    total: string; // Total price, e.g., "54.05"
  };

  @IsNotEmpty()
  @IsObject()
  links: {
    flightDates: string; // Link to flight dates API
    flightOffers: string; // Link to flight offers API
  };
}

export class LocationDetailsDTO {
  @IsNotEmpty()
  @IsString()
  subType: string; // e.g., "AIRPORT"

  @IsNotEmpty()
  @IsString()
  detailedName: string; // Full name of the airport, e.g., "ADOLFO SUAREZ BARAJAS"
}

export class GetFlightDTO {
  @IsString()
  origin: string;

  @IsOptional()
  @IsString()
  departureDate?: string;

  @IsOptional()
  @IsBoolean()
  oneWay?: boolean;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsBoolean()
  nonStop?: boolean;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsEnum(['COUNTRY', 'CITY', 'AIRPORT'])
  viewBy?: string = 'COUNTRY';
}
