export interface IAuthToken {
  type: string; // Type of the token, e.g., "amadeusOAuth2Token"
  username: string; // User's email or username
  application_name: string; // Name of the application
  client_id: string; // Client ID for authentication
  token_type: string; // Type of the token, e.g., "Bearer"
  access_token: string; // The actual access token
  expires_in: number; // Token expiration time in seconds
  state: string; // State of the token, e.g., "approved"
  scope: string; // Scope of the token, can be empty
}

export interface IFlightResponse {
  data: IFlightDestination[];
  dictionaries: {
    currencies: Record<string, string>;
    locations: Record<string, ILocationDetails>;
  };
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

export interface IFlightDestination {
  type: string; // e.g., "flight-destination"
  origin: string; // Origin airport code, e.g., "MAD"
  destination: string; // Destination airport code, e.g., "OPO"
  departureDate: string; // Departure date, e.g., "2025-05-30"
  returnDate: string; // Return date, e.g., "2025-06-14"
  price: {
    total: string; // Total price, e.g., "54.05"
  };
  links: {
    flightDates: string; // Link to flight dates API
    flightOffers: string; // Link to flight offers API
  };
}

export interface ILocationDetails {
  subType: string; // e.g., "AIRPORT"
  detailedName: string; // Full name of the airport, e.g., "ADOLFO SUAREZ BARAJAS"
}
