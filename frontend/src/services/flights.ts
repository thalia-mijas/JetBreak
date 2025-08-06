// import { writeFile } from "fs/promises";

// Tipos para los datos de vuelos
// export interface FlightData {
//   flight_date: string;
//   flight_status: string;
//   departure: {
//     airport: string;
//     timezone: string;
//     iata: string;
//     icao: string;
//     terminal: string;
//     gate: string;
//     delay: number;
//     scheduled: string;
//     estimated: string;
//     actual: string;
//     estimated_runway: string;
//     actual_runway: string;
//   };
//   arrival: {
//     airport: string;
//     timezone: string;
//     iata: string;
//     icao: string;
//     terminal: string;
//     gate: string;
//     baggage: string;
//     delay: number;
//     scheduled: string;
//     estimated: string;
//     actual: string;
//     estimated_runway: string;
//     actual_runway: string;
//   };
//   airline: {
//     name: string;
//     iata: string;
//     icao: string;
//   };
//   flight: {
//     number: string;
//     iata: string;
//     icao: string;
//     codeshared: any;
//   };
//   aircraft: {
//     registration: string;
//     iata: string;
//     icao: string;
//     icao24: string;
//   };
//   live: {
//     updated: string;
//     latitude: number;
//     longitude: number;
//     altitude: number;
//     direction: number;
//     speed_horizontal: number;
//     speed_vertical: number;
//     is_ground: boolean;
//   };
// }

// export interface ApiResponse {
//   pagination: {
//     limit: number;
//     offset: number;
//     count: number;
//     total: number;
//   };
//   data: FlightData[];
// }

export async function getFlights(codeIata: string, typeConsult: string) {
  const API_KEY = import.meta.env.VITE_AVIATION_STACK_API_KEY;
  if (!API_KEY) {
    throw new Error(
      "API key is not defined. Please set VITE_API_KEY in your environment variables."
    );
  }
  const airport = codeIata || "MAD";
  const type = typeConsult || "arrival"; // arrival or departure
  let data;

  const BASE_URL = "https://api.aviationstack.com/v1/timetable";

  const url = `${BASE_URL}?iataCode=${airport}&type=${type}&access_key=${API_KEY}&limit=10`;

  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
