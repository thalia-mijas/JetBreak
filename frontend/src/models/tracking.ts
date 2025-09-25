export type trackingFlight = {
  id: number;
  user_id: number;
  flight_iata: string;
  airline_id: number;
  origin_iata: string;
  date_departure: string;
  destination_iata: string;
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
  origin: {
    id: number;
    iata_code: string;
    latitude: number;
    longitude: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  destination: {
    id: number;
    iata_code: string;
    latitude: number;
    longitude: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};
