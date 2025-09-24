import { Card, Chip, Input, Tab, Tabs } from "@heroui/react";
import { Clock, Plane, Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { Airport } from "../models/airport";
import type { Flight } from "../models/flights";
import * as APIAirports from "../services/airports";
import * as API from "../services/flights";

export default function Flights({
  selectedAirport,
}: {
  selectedAirport: string;
}) {
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

  const [flights, setFlights] = useState<Flight[]>([]);
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [typeInfo, setTypeInfo] = useState("arrivals"); // Example type of flight information
  const [valueSearch, setValueSearch] = useState(""); // Search input state

  const duration = (arrival: string, departure: string) => {
    const diffMs = new Date(arrival).getTime() - new Date(departure).getTime();
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  useEffect(() => {
    APIAirports.getAirports()
      .then((data) => {
        console.log("Datos de aeropuertos obtenidos: ", data);
        setAirports(data);
      })
      .catch((err) => {
        console.error("Error fetching airports: ", err);
      });
  }, []);

  useEffect(() => {
    API.getFlights(selectedAirport, typeInfo)
      .then((data) => {
        console.log("Datos de vuelos obtenidos: ", data);
        setAllFlights(data);
        setFlights(data);
      })
      .catch((err) => {
        console.error("Error fetching flights: ", err);
      });
    setValueSearch("");
  }, [selectedAirport, typeInfo]);

  useEffect(() => {
    if (valueSearch === "") {
      setFlights(allFlights); // restaurar todos si el input está vacío
    } else {
      const filteredFlights = allFlights.filter((flight) =>
        flight.flight.iataNumber
          .toLowerCase()
          .includes(valueSearch.toLowerCase())
      );
      console.log("Filtered Flights: ", filteredFlights);
      setFlights(filteredFlights);
    }
  }, [valueSearch, allFlights]);

  return (
    <>
      <div id="vuelos" className="py-16">
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
              <Input
                placeholder="(ej: LA3144)"
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
                startContent={<Search className="h-5 w-5" />}
              />
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
              key="arrivals"
              title={
                <div className="flex items-center space-x-2">
                  <span>Llegadas</span>
                </div>
              }
            >
              <div className="max-h-[500px] overflow-auto p-2">
                {flights.length > 0 ? (
                  flights?.map((flight, index) => (
                    <Card key={index}>
                      <div className="flex items-center justify-between p-6">
                        <div className="flex items-center space-x-4 w-1/2">
                          <div className="bg-turquoise-100 p-2 rounded-lg">
                            <Plane className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {flight.flight.iataNumber}
                            </h3>
                            <p className="text-gray-600">
                              Desde{" "}
                              {airports.filter(
                                (airport) =>
                                  airport.iata_code ===
                                  flight.departure.iataCode
                              )[0]?.country ||
                                airports.filter(
                                  (airport) =>
                                    airport.iata_code ===
                                    flight.departure.iataCode
                                )[0]?.name}
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
                  ))
                ) : (
                  <p>Cargando vuelos...</p>
                )}
              </div>
            </Tab>
            <Tab
              key="departures"
              title={
                <div className="flex items-center space-x-2">
                  <span>Salidas</span>
                </div>
              }
            >
              <div className="max-h-[500px] overflow-auto p-2">
                {flights.length > 0 ? (
                  flights.map((flight, index) => (
                    <Card key={index}>
                      <div className="flex items-center justify-between p-6">
                        <div className="flex items-center space-x-4 w-1/2">
                          <div className="bg-turquoise-100 p-2 rounded-lg">
                            <Plane className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {flight.flight.iataNumber}
                            </h3>
                            <p className="text-gray-600">
                              Hacia{" "}
                              {airports.filter(
                                (airport) =>
                                  airport.iata_code === flight.arrival.iataCode
                              )[0]?.country ||
                                airports.filter(
                                  (airport) =>
                                    airport.iata_code ===
                                    flight.departure.iataCode
                                )[0]?.name}
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
                  ))
                ) : (
                  <p>Cargando vuelos...</p>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
