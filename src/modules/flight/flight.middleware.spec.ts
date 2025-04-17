import { FlightMiddleware } from './flight.middleware';

describe('FlightMiddleware', () => {
  it('should be defined', () => {
    expect(new FlightMiddleware()).toBeDefined();
  });
});
