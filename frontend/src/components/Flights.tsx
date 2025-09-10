import { Button, Card, Chip, Tab, Tabs } from "@heroui/react";
import { Clock, Plane, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function Flights() {
  const flights = {
    arrivals: [
      {
        airline: { iataCode: "IB", icaoCode: "IBE", name: "Iberia" },
        arrival: {
          actualRunway: "2025-07-29T12:00:00.000",
          actualTime: "2025-07-29T12:00:00.000",
          baggage: "06",
          delay: "1",
          estimatedRunway: "2025-07-29T12:00:00.000",
          estimatedTime: "2025-07-29T11:57:00.000",
          gate: null,
          iataCode: "MAD",
          icaoCode: "LEMD",
          scheduledTime: "2025-07-29T12:00:00.000",
          terminal: "4S",
        },
        codeshared: {
          airline: {
            iataCode: "la",
            icaoCode: "lan",
            name: "latam airlines",
          },
          flight: {
            iataNumber: "la8076",
            icaoNumber: "lan8076",
            number: "8076",
          },
        },
        departure: {
          actualRunway: "2025-07-28T21:19:00.000",
          actualTime: "2025-07-28T21:19:00.000",
          baggage: null,
          delay: "19",
          estimatedRunway: "2025-07-28T21:19:00.000",
          estimatedTime: "2025-07-28T21:22:00.000",
          gate: "303",
          iataCode: "GRU",
          icaoCode: "SBGR",
          scheduledTime: "2025-07-28T21:00:00.000",
          terminal: "3",
        },
        flight: {
          iataNumber: "IB6808",
          icaoNumber: "IBE6808",
          number: "6808",
        },
        status: "landed",
        type: "arrival",
      },
      {
        airline: {
          iataCode: "QR",
          icaoCode: "QTR",
          name: "Qatar Airways",
        },
        arrival: {
          actualRunway: "2025-07-29T12:00:00.000",
          actualTime: "2025-07-29T12:00:00.000",
          baggage: "06",
          delay: "1",
          estimatedRunway: "2025-07-29T12:00:00.000",
          estimatedTime: "2025-07-29T11:57:00.000",
          gate: null,
          iataCode: "MAD",
          icaoCode: "LEMD",
          scheduledTime: "2025-07-29T12:00:00.000",
          terminal: "4S",
        },
        codeshared: {
          airline: {
            iataCode: "la",
            icaoCode: "lan",
            name: "latam airlines",
          },
          flight: {
            iataNumber: "la8076",
            icaoNumber: "lan8076",
            number: "8076",
          },
        },
        departure: {
          actualRunway: "2025-07-28T21:19:00.000",
          actualTime: "2025-07-28T21:19:00.000",
          baggage: null,
          delay: "19",
          estimatedRunway: "2025-07-28T21:19:00.000",
          estimatedTime: "2025-07-28T21:22:00.000",
          gate: "303",
          iataCode: "GRU",
          icaoCode: "SBGR",
          scheduledTime: "2025-07-28T21:00:00.000",
          terminal: "3",
        },
        flight: {
          iataNumber: "QR8435",
          icaoNumber: "QTR8435",
          number: "8435",
        },
        status: "cancelled",
        type: "arrival",
      },
      {
        airline: {
          iataCode: "LA",
          icaoCode: "LAN",
          name: "LATAM Airlines",
        },
        arrival: {
          actualRunway: "2025-07-29T12:00:00.000",
          actualTime: "2025-07-29T12:00:00.000",
          baggage: "06",
          delay: "1",
          estimatedRunway: "2025-07-29T12:00:00.000",
          estimatedTime: "2025-07-29T11:57:00.000",
          gate: null,
          iataCode: "MAD",
          icaoCode: "LEMD",
          scheduledTime: "2025-07-29T12:00:00.000",
          terminal: "4S",
        },
        codeshared: null,
        departure: {
          actualRunway: "2025-07-28T21:19:00.000",
          actualTime: "2025-07-28T21:19:00.000",
          baggage: null,
          delay: "19",
          estimatedRunway: "2025-07-28T21:19:00.000",
          estimatedTime: "2025-07-28T21:22:00.000",
          gate: "303",
          iataCode: "GRU",
          icaoCode: "SBGR",
          scheduledTime: "2025-07-28T21:00:00.000",
          terminal: "3",
        },
        flight: {
          iataNumber: "LA8076",
          icaoNumber: "LAN8076",
          number: "8076",
        },
        status: "incident",
        type: "arrival",
      },
      {
        airline: { iataCode: "AV", icaoCode: "AVA", name: "SA AVIANCA" },
        arrival: {
          actualRunway: "2025-07-29T11:43:00.000",
          actualTime: "2025-07-29T11:43:00.000",
          baggage: "14",
          delay: null,
          estimatedRunway: "2025-07-29T11:43:00.000",
          estimatedTime: "2025-07-29T11:43:00.000",
          gate: null,
          iataCode: "MAD",
          icaoCode: "LEMD",
          scheduledTime: "2025-07-29T12:00:00.000",
          terminal: "4",
        },
        codeshared: {
          airline: { iataCode: "ib", icaoCode: "ibe", name: "iberia" },
          flight: {
            iataNumber: "ib408",
            icaoNumber: "ibe408",
            number: "408",
          },
        },
        departure: {
          actualRunway: "2025-07-29T10:56:00.000",
          actualTime: "2025-07-29T10:56:00.000",
          baggage: null,
          delay: "22",
          estimatedRunway: "2025-07-29T10:56:00.000",
          estimatedTime: "2025-07-29T10:38:00.000",
          gate: "A2",
          iataCode: "BCN",
          icaoCode: "LEBL",
          scheduledTime: "2025-07-29T10:35:00.000",
          terminal: "1",
        },
        flight: {
          iataNumber: "AV6017",
          icaoNumber: "AVA6017",
          number: "6017",
        },
        status: "diverted",
        type: "arrival",
      },
      {
        airline: {
          iataCode: "LA",
          icaoCode: "LAN",
          name: "LATAM Airlines",
        },
        arrival: {
          actualRunway: "2025-07-29T11:43:00.000",
          actualTime: "2025-07-29T11:43:00.000",
          baggage: "14",
          delay: null,
          estimatedRunway: "2025-07-29T11:43:00.000",
          estimatedTime: "2025-07-29T11:43:00.000",
          gate: null,
          iataCode: "MAD",
          icaoCode: "LEMD",
          scheduledTime: "2025-07-29T12:00:00.000",
          terminal: "4",
        },
        codeshared: {
          airline: { iataCode: "ib", icaoCode: "ibe", name: "iberia" },
          flight: {
            iataNumber: "ib408",
            icaoNumber: "ibe408",
            number: "408",
          },
        },
        departure: {
          actualRunway: "2025-07-29T10:56:00.000",
          actualTime: "2025-07-29T10:56:00.000",
          baggage: null,
          delay: "22",
          estimatedRunway: "2025-07-29T10:56:00.000",
          estimatedTime: "2025-07-29T10:38:00.000",
          gate: "A2",
          iataCode: "BCN",
          icaoCode: "LEBL",
          scheduledTime: "2025-07-29T10:35:00.000",
          terminal: "1",
        },
        flight: {
          iataNumber: "LA1517",
          icaoNumber: "LAN1517",
          number: "1517",
        },
        status: "scheduled",
        type: "arrival",
      },
    ],
    departures: [
      {
        airline: { iataCode: "IB", icaoCode: "IBE", name: "Iberia" },
        arrival: {
          actualRunway: null,
          actualTime: null,
          baggage: null,
          delay: null,
          estimatedRunway: null,
          estimatedTime: null,
          gate: null,
          iataCode: "LHR",
          icaoCode: "EGLL",
          scheduledTime: "2025-07-29T13:25:00.000",
          terminal: "5",
        },
        codeshared: {
          airline: {
            iataCode: "ba",
            icaoCode: "baw",
            name: "british airways",
          },
          flight: {
            iataNumber: "ba459",
            icaoNumber: "baw459",
            number: "459",
          },
        },
        departure: {
          actualRunway: null,
          actualTime: null,
          baggage: null,
          delay: "35",
          estimatedRunway: null,
          estimatedTime: "2025-07-29T12:35:00.000",
          gate: null,
          iataCode: "MAD",
          icaoCode: "LEMD",
          scheduledTime: "2025-07-29T12:00:00.000",
          terminal: "4S",
        },
        flight: {
          iataNumber: "IB3644",
          icaoNumber: "IBE3644",
          number: "3644",
        },
        status: "active",
        type: "departure",
      },
      {
        airline: {
          iataCode: "AA",
          icaoCode: "AAL",
          name: "American Airlines",
        },
        arrival: {
          actualRunway: null,
          actualTime: null,
          baggage: null,
          delay: null,
          estimatedRunway: null,
          estimatedTime: null,
          gate: null,
          iataCode: "LHR",
          icaoCode: "EGLL",
          scheduledTime: "2025-07-29T13:25:00.000",
          terminal: "5",
        },
        codeshared: {
          airline: {
            iataCode: "ba",
            icaoCode: "baw",
            name: "british airways",
          },
          flight: {
            iataNumber: "ba459",
            icaoNumber: "baw459",
            number: "459",
          },
        },
        departure: {
          actualRunway: null,
          actualTime: null,
          baggage: null,
          delay: "35",
          estimatedRunway: null,
          estimatedTime: "2025-07-29T12:35:00.000",
          gate: null,
          iataCode: "MAD",
          icaoCode: "LEMD",
          scheduledTime: "2025-07-29T12:00:00.000",
          terminal: "4S",
        },
        flight: {
          iataNumber: "AA6803",
          icaoNumber: "AAL6803",
          number: "6803",
        },
        status: "active",
        type: "departure",
      },
      {
        airline: {
          iataCode: "JL",
          icaoCode: "JTL",
          name: "Jet Linx Aviation",
        },
        arrival: {
          actualRunway: null,
          actualTime: null,
          baggage: null,
          delay: null,
          estimatedRunway: null,
          estimatedTime: null,
          gate: null,
          iataCode: "LHR",
          icaoCode: "EGLL",
          scheduledTime: "2025-07-29T13:25:00.000",
          terminal: "5",
        },
        codeshared: {
          airline: {
            iataCode: "ba",
            icaoCode: "baw",
            name: "british airways",
          },
          flight: {
            iataNumber: "ba459",
            icaoNumber: "baw459",
            number: "459",
          },
        },
        departure: {
          actualRunway: null,
          actualTime: null,
          baggage: null,
          delay: "35",
          estimatedRunway: null,
          estimatedTime: "2025-07-29T12:35:00.000",
          gate: null,
          iataCode: "MAD",
          icaoCode: "LEMD",
          scheduledTime: "2025-07-29T12:00:00.000",
          terminal: "4S",
        },
        flight: {
          iataNumber: "JL7702",
          icaoNumber: "JTL7702",
          number: "7702",
        },
        status: "active",
        type: "departure",
      },
      {
        airline: {
          iataCode: "BA",
          icaoCode: "BAW",
          name: "British Airways",
        },
        arrival: {
          actualRunway: null,
          actualTime: null,
          baggage: null,
          delay: null,
          estimatedRunway: null,
          estimatedTime: null,
          gate: null,
          iataCode: "LHR",
          icaoCode: "EGLL",
          scheduledTime: "2025-07-29T15:25:00.000",
          terminal: "5",
        },
        codeshared: null,
        departure: {
          actualRunway: null,
          actualTime: null,
          baggage: null,
          delay: "35",
          estimatedRunway: null,
          estimatedTime: "2025-07-29T12:35:00.000",
          gate: null,
          iataCode: "MAD",
          icaoCode: "LEMD",
          scheduledTime: "2025-07-29T12:00:00.000",
          terminal: "4S",
        },
        flight: {
          iataNumber: "BA459",
          icaoNumber: "BAW459",
          number: "459",
        },
        status: "active",
        type: "departure",
      },
      {
        airline: { iataCode: "FR", icaoCode: "RYR", name: "Ryanair" },
        arrival: {
          actualRunway: null,
          actualTime: null,
          baggage: "19",
          delay: null,
          estimatedRunway: null,
          estimatedTime: "2025-07-29T13:18:00.000",
          gate: "C50",
          iataCode: "PMI",
          icaoCode: "LEPA",
          scheduledTime: "2025-07-29T13:25:00.000",
          terminal: null,
        },
        codeshared: null,
        departure: {
          actualRunway: "2025-07-29T12:16:00.000",
          actualTime: "2025-07-29T12:16:00.000",
          baggage: null,
          delay: "17",
          estimatedRunway: "2025-07-29T12:16:00.000",
          estimatedTime: "2025-07-29T12:00:00.000",
          gate: "C50",
          iataCode: "MAD",
          icaoCode: "LEMD",
          scheduledTime: "2025-07-29T12:00:00.000",
          terminal: "2",
        },
        flight: {
          iataNumber: "FR2053",
          icaoNumber: "RYR2053",
          number: "2053",
        },
        status: "unknown",
        type: "departure",
      },
    ],
  }; // Example flights data, replace with actual data fetching logic

  const flightStatuses = [
    { key: "landed", label: "Aterrizado", color: "success" }, // verde
    { key: "scheduled", label: "Programado", color: "secondary" }, // azul
    { key: "cancelled", label: "Cancelado", color: "danger" }, // rojo
    { key: "active", label: "En vuelo", color: "success" }, // amarillo
    { key: "incident", label: "Incidente", color: "danger" }, // púrpura
    { key: "diverted", label: "Desviado", color: "warning" }, // marrón
    { key: "redirected", label: "Redirigido", color: "warning" }, // cian
    { key: "unknown", label: "Desconocido", color: "default" }, // gris
  ];

  const [selectedAirport, setSelectedAirport] = useState(""); // Example selected airport
  const [typeInfo, setTypeInfo] = useState("arrival"); // Example type of flight information

  const lastUpdated = new Date(); // Example last updated time
  const loading = false; // Example loading state

  const refetch = () => {
    // Logic to refetch flight information
    console.log("Refetching flight information...");
  };

  const duration = (arrival: string, departure: string) => {
    const diffMs = new Date(arrival).getTime() - new Date(departure).getTime();
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  // useEffect(() => {
  //   API.getFlights("MAD", "arrival")
  //     .then((response) => {
  //       setFlights(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setError(err.message);
  //     });
  // }, [selectedAirport, typeInfo]);

  return (
    <>
      <div id="vuelos" className="bg-[#EAEFEF] py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Información de vuelos
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Consulta llegadas, salidas y estado de vuelos en tiempo real
            </p>
          </div>

          <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Aeropuerto:</label>
              <label className="text-sm font-medium">{selectedAirport}</label>
            </div>

            <div className="flex items-center gap-4">
              {lastUpdated && (
                <span className="text-sm text-gray-500">
                  Actualizado: {lastUpdated.toLocaleTimeString("es-ES")}
                </span>
              )}
              <Button
                variant="bordered"
                color="primary"
                startContent={
                  <RefreshCw
                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                  />
                }
                size="sm"
                onPress={refetch}
                disabled={loading}
              >
                Actualizar
              </Button>
            </div>
          </div>

          {/* Llegadas y salidas */}
          <Tabs
            aria-label="Options"
            classNames={{
              tabList:
                "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-primary",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-primary",
            }}
            color="primary"
            variant="underlined"
            onSelectionChange={(key) => setTypeInfo(key as string)}
          >
            <Tab
              key="arrival"
              title={
                <div className="flex items-center space-x-2">
                  <span>Llegadas</span>
                </div>
              }
            >
              {flights?.arrivals?.map((flight, index) => (
                <Card key={index}>
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-turquoise-100 p-2 rounded-lg">
                        <Plane className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {flight.flight.iataNumber}
                        </h3>
                        <p className="text-gray-600">
                          Desde {flight.departure.iataCode}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center text-gray-600 mb-1 justify-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {duration(
                          flight.arrival.scheduledTime,
                          flight.departure.scheduledTime
                        )}
                      </div>
                      <Chip
                        color={
                          flightStatuses.find(
                            (status) => status.key === flight.status
                          )?.color || "default"
                        }
                        size="sm"
                        variant="flat"
                      >
                        {flightStatuses.find(
                          (status) => status.key === flight.status
                        )?.label || "-"}
                      </Chip>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Puerta</p>
                      <p className="font-semibold text-lg">
                        {flight.arrival.gate ? flight.arrival.gate : "N/A"}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </Tab>
            <Tab
              key="departure"
              title={
                <div className="flex items-center space-x-2">
                  <span>Salidas</span>
                </div>
              }
            >
              {flights?.departures?.map((flight, index) => (
                <Card key={index}>
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-turquoise-100 p-2 rounded-lg">
                        <Plane className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {flight.flight.iataNumber}
                        </h3>
                        <p className="text-gray-600">
                          Hacia {flight.arrival.iataCode}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center text-gray-600 mb-1 justify-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {duration(
                          flight.arrival.scheduledTime,
                          flight.departure.scheduledTime
                        )}
                      </div>
                      <Chip
                        color={
                          flightStatuses.find(
                            (status) => status.key === flight.status
                          )?.color || "default"
                        }
                        size="sm"
                        variant="flat"
                      >
                        {flightStatuses.find(
                          (status) => status.key === flight.status
                        )?.label || "-"}
                      </Chip>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Puerta</p>
                      <p className="font-semibold text-lg">
                        {flight.arrival.gate ? flight.arrival.gate : "N/A"}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
