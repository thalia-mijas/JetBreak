export type trackingFlight = {
  id: number;
  flight_iata: string;
  airline_id: number;
  date_departure: string;
  date_arrival: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  airline: {
    id: number;
    iata_code: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  Airports: [
    {
      id: number;
      iata_code: string;
      latitude: number;
      longitude: number;
      name: string;
      country: string;
      createdAt: string;
      updatedAt: string;
      FlightAirport: {
        type: string;
      };
    },
    {
      id: number;
      iata_code: string;
      latitude: number;
      longitude: number;
      name: string;
      country: string;
      createdAt: string;
      updatedAt: string;
      FlightAirport: {
        type: string;
      };
    },
  ];
};
