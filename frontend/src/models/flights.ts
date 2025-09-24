export type Flight = {
  airline: {
    iataCode: string;
    icaoCode: string;
    name: string;
  };
  arrival: {
    actualRunway: string | null;
    actualTime: string | null;
    baggage: string | null;
    delay: string | null;
    estimatedRunway: string | null;
    estimatedTime: string | null;
    gate: string | null;
    iataCode: string | null;
    icaoCode: string | null;
    scheduledTime: string;
    terminal: string | null;
  };
  codeshared: {
    airline: {
      iataCode: string;
      icaoCode: string;
      name: string;
    };
    flight: {
      iataNumber: string;
      icaoNumber: string;
      number: string;
    };
  };
  departure: {
    actualRunway: string | null;
    actualTime: string | null;
    baggage: string | null;
    delay: string | null;
    estimatedRunway: string | null;
    estimatedTime: string | null;
    gate: string | null;
    iataCode: string | null;
    icaoCode: string | null;
    scheduledTime: string;
    terminal: string | null;
  };
  flight: {
    iataNumber: string;
    icaoNumber: string;
    number: string;
  };
  status: string | null;
  type: "departure";
};
