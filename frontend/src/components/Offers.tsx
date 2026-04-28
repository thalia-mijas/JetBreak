import { Badge, Button, Card, CardHeader, Input, Spinner } from "@heroui/react";
import { ArrowLeft, ArrowRight, Plane, Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { Airline } from "../models/airline";
import type { Airport } from "../models/airport";
import type { Offer } from "../models/offer";
import type { OfferDetail } from "../models/offerDetail";
import type { trackingFlight } from "../models/tracking";
import * as AirlinesAPI from "../services/airlines";
import * as AirportsAPI from "../services/airports";
import * as API from "../services/offers";
import TrackButton from "./TrackButton";

export default function Offers() {
  const [flightOffers, setFlightOffers] = useState<Offer[]>([]);
  const [viewDetails, setViewDetails] = useState<boolean>(false);
  const [offerDetails, setOfferDetails] = useState<OfferDetail[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [valueInput, setValueInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [trackingFlights, setTrackingFlights] = useState<trackingFlight[]>([]);

  const parseDuration = (duration: string) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return duration;
    const hours = match[1] ? Number.parseInt(match[1]) : 0;
    const minutes = match[2] ? Number.parseInt(match[2]) : 0;
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    AirportsAPI.getAirports().then(setAirports);
    AirlinesAPI.getAirlines().then(setAirlines);
    // TrackingAPI.getTrackingFlights().then(setTrackingFlights);
  }, []);

  // Airport name
  const getAirportName = (iata: string) => {
    const airport = airports.find((airport) => airport.iata_code === iata);
    return airport ? airport.name : iata;
  };

  // Airport country
  const getAirportCountry = (iata: string) => {
    const airport = airports.find((airport) => airport.iata_code === iata);
    return airport ? airport.country : iata;
  };

  // Get airline logo URL (mock)
  const getAirlineLogo = (carrierCode: string) => {
    return `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${carrierCode}.svg`;
  };

  // Get airline name from carrier code (mock data)
  const getAirlineName = (carrierCode: string) => {
    const airline = airlines.find(
      (airline) => airline.iata_code === carrierCode
    );
    return airline ? airline.name : carrierCode;
  };

  // Format date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      time: date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
  };

  const fetchOffers = () => {
    setLoading(true);
    API.getOffers(valueInput)
      .then((data) => {
        console.log("Ofertas obtenidas: ", data);
        setFlightOffers(data);
      })
      .catch((err) => {
        console.error("Error fetching offers: ", err);
      })
      .finally(() => setLoading(false));
  };

  const fetchingDetails = (conf: string) => {
    API.getOfferDetails(conf)
      .then((data) => {
        console.log("Detalles de oferta obtenidos: ", data);
        setOfferDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching offer details: ", err);
        setLoading(false);
      });
  };

  const renderFlightMessage = () => {
    if (flightOffers?.length === 0) {
      if (loading) {
        return <Spinner color="success" />;
      } else {
        if (valueInput === "") {
          return (
            <p className="text-center text-gray-600">
              Por favor, selecciona tu aeropuerto de salida para ver la
              información de vuelos de inspiración.
            </p>
          );
        }
      }
    } else {
      if (!loading && flightOffers?.length === 0) {
        return (
          <p className="text-center text-gray-500">
            No se encontraron ofertas de vuelos disponibles.
          </p>
        );
      }
      if (!viewDetails) {
        return (
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            {flightOffers?.length > 0 ? (
              flightOffers.map((offer) => {
                return (
                  <Card
                    key={offer.id}
                    className="hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    {/* Route Information */}
                    <div className=" p-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex flex-col items-end gap-2">
                          <div className="w-2 h-2 bg-[#56DFCF] rounded-full"></div>
                          <span className="font-medium">
                            {getAirportName(offer.origin)}
                          </span>
                          <span className="font-medium">
                            {getAirportCountry(offer.origin)}
                          </span>
                          <span>{offer.departure}</span>
                        </div>
                        <div className="text-[#56DFCF]">
                          <ArrowRight className="h-10 w-10 ml-2" />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="font-medium">
                            {getAirportName(offer.destination)}
                          </span>
                          <span className="font-medium">
                            {getAirportCountry(offer.destination)}
                          </span>
                          <span>{offer.return}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price Information */}
                    <button
                      className="bg-[#56DFCF] px-4 py-2 rounded-lg flex justify-center items-center text-white"
                      onClick={() => {
                        setViewDetails(!viewDetails);
                        fetchingDetails(offer.conf);
                        setLoading(true);
                      }}
                    >
                      <span className="text-xl font-bold ">
                        Revisar detalles de ruta
                      </span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </Card>
                );
              })
            ) : loading ? (
              <Spinner color="success" />
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No existen ofertas de vuelos.
              </p>
            )}
          </div>
        );
      } else {
        return (
          <>
            {loading ? (
              <Spinner color="success" />
            ) : (
              <div className="w-full">
                {offerDetails.length > 0 ? (
                  <div>
                    <div className="w-full flex items-center mb-6 gap-4">
                      <ArrowLeft
                        className="h-6 w-6 text-gray-600 mb-4 cursor-pointer"
                        onClick={() => setViewDetails(false)}
                      />
                      <div className="w-lvw">
                        <p className="text-lg font-semibold text-gray-900 text-center">
                          {
                            offerDetails[0].itineraries[0]?.segments[0]
                              .departure.iataCode
                          }{" "}
                          ✈{" "}
                          {
                            offerDetails[0].itineraries[0]?.segments[0].arrival
                              .iataCode
                          }
                        </p>
                        <p className="text-lg font-semibold text-gray-900 text-center">
                          {
                            formatDateTime(
                              offerDetails[0].itineraries[0]?.segments[0]
                                .departure.at
                            ).date
                          }{" "}
                          a{" "}
                          {
                            formatDateTime(
                              offerDetails[0].itineraries[1]?.segments[0]
                                .arrival.at
                            ).date
                          }
                        </p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                      {offerDetails.map((detail) => {
                        const outboundItinerary = detail.itineraries[0];
                        const returnItinerary = detail.itineraries[1];
                        const mainCarrier =
                          outboundItinerary.segments[0].carrierCode;
                        return (
                          <Card
                            key={detail.id}
                            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden p-4"
                          >
                            <CardHeader className="pb-4">
                              <div className="flex justify-between mb-3 w-full">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-8 bg-white rounded border flex items-center justify-center overflow-hidden">
                                    <img
                                      src={
                                        getAirlineLogo(mainCarrier) ||
                                        "/placeholder.svg"
                                      }
                                      alt={getAirlineName(mainCarrier)}
                                    />
                                    <div className="hidden text-xs font-bold text-gray-600">
                                      {getAirlineName(mainCarrier).substring(
                                        0,
                                        2
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <h2 className="text-lg font-semibold">
                                      {getAirlineName(mainCarrier)}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                      Vuelo directo •{" "}
                                      {outboundItinerary.segments[0]
                                        .numberOfStops === 0
                                        ? "Sin escalas"
                                        : `${outboundItinerary.segments[0].numberOfStops} escala(s)`}
                                    </p>
                                  </div>
                                </div>
                                <TrackButton
                                  trackingFlights={trackingFlights}
                                  offerDetail={detail}
                                  setTrackingFlights={setTrackingFlights}
                                />
                              </div>
                            </CardHeader>

                            <div className="space-y-6">
                              {/* Outbound Flight */}
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                  <Plane className="h-4 w-4 text-[#56DFCF]" />
                                  <span>Ida</span>
                                  <Badge variant="flat" className="text-xs">
                                    {outboundItinerary.segments[0].carrierCode}
                                    {outboundItinerary.segments[0].number}
                                  </Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="text-center">
                                    <div className="font-bold text-xl text-gray-900">
                                      {
                                        formatDateTime(
                                          outboundItinerary.segments[0]
                                            .departure.at
                                        ).time
                                      }
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {getAirportName(
                                        outboundItinerary.segments[0].departure
                                          .iataCode
                                      )}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {
                                        formatDateTime(
                                          outboundItinerary.segments[0]
                                            .departure.at
                                        ).date
                                      }
                                    </div>
                                  </div>

                                  <div className="flex-1 flex flex-col items-center mx-4">
                                    <div className="flex items-center w-full">
                                      <div className="flex-1 h-px bg-gray-300"></div>
                                      <div className="mx-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        {parseDuration(
                                          outboundItinerary.duration
                                        )}
                                      </div>
                                      <div className="flex-1 h-px bg-gray-300"></div>
                                    </div>
                                    <Plane className="h-4 w-4 text-gray-400 mt-1 rotate-90" />
                                  </div>

                                  <div className="text-center">
                                    <div className="font-bold text-xl text-gray-900">
                                      {
                                        formatDateTime(
                                          outboundItinerary.segments[0].arrival
                                            .at
                                        ).time
                                      }
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {getAirportName(
                                        outboundItinerary.segments[0].arrival
                                          .iataCode
                                      )}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {
                                        formatDateTime(
                                          outboundItinerary.segments[0].arrival
                                            .at
                                        ).date
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Return Flight */}
                              {returnItinerary && (
                                <div className="space-y-3 border-t pt-4">
                                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Plane className="h-4 w-4 text-[#56DFCF] rotate-180" />
                                    <span>Vuelta</span>
                                    <Badge variant="flat" className="text-xs">
                                      {returnItinerary.segments[0].carrierCode}
                                      {returnItinerary.segments[0].number}
                                    </Badge>
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div className="text-center">
                                      <div className="font-bold text-xl text-gray-900">
                                        {
                                          formatDateTime(
                                            returnItinerary.segments[0]
                                              .departure.at
                                          ).time
                                        }
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        {getAirportName(
                                          returnItinerary.segments[0].departure
                                            .iataCode
                                        )}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {
                                          formatDateTime(
                                            returnItinerary.segments[0]
                                              .departure.at
                                          ).date
                                        }
                                      </div>
                                      {returnItinerary.segments[0].departure
                                        .terminal && (
                                        <div className="text-xs text-gray-400">
                                          T
                                          {
                                            returnItinerary.segments[0]
                                              .departure.terminal
                                          }
                                        </div>
                                      )}
                                    </div>

                                    <div className="flex-1 flex flex-col items-center mx-4">
                                      <div className="flex items-center w-full">
                                        <div className="flex-1 h-px bg-gray-300"></div>
                                        <div className="mx-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                          {parseDuration(
                                            returnItinerary.duration
                                          )}
                                        </div>
                                        <div className="flex-1 h-px bg-gray-300"></div>
                                      </div>
                                      <Plane className="h-4 w-4 text-gray-400 mt-1 -rotate-90" />
                                    </div>

                                    <div className="text-center">
                                      <div className="font-bold text-xl text-gray-900">
                                        {
                                          formatDateTime(
                                            returnItinerary.segments[0].arrival
                                              .at
                                          ).time
                                        }
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        {getAirportName(
                                          returnItinerary.segments[0].arrival
                                            .iataCode
                                        )}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {
                                          formatDateTime(
                                            returnItinerary.segments[0].arrival
                                              .at
                                          ).date
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Price and Actions */}
                              <div className="flex items-center justify-center pt-4 border-t gap-4">
                                <div className="text-3xl font-bold text-[#56DFCF]">
                                  {detail.total}
                                </div>
                                <div className="text-xs text-gray-500">
                                  por persona
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 col-span-full">
                    No se encontraron detalles de esta ruta.
                  </p>
                )}
              </div>
            )}
          </>
        );
      }
    }
  };

  return (
    <>
      <section id="ofertas" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ofertas de Vuelos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre las mejores ofertas y promociones disponibles
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto max-w-2xl mb-4">
            <div className="flex gap-2 rounded-lg bg-white p-2 shadow-lg">
              <div className="relative flex-1">
                <Input
                  placeholder="(ej: Madrid, MAD, Barajas)"
                  value={valueInput}
                  onChange={(e) => setValueInput(e.target.value.toUpperCase())}
                  list="airport-suggestions"
                />
                <datalist id="airport-suggestions">
                  {Array.isArray(airports) &&
                    airports.map((airport) => (
                      <option key={airport.iata_code} value={airport.iata_code}>
                        {airport.name} ({airport.iata_code})
                      </option>
                    ))}
                </datalist>
              </div>
              <Button
                color="primary"
                startContent={<Search className="h-5 w-5" />}
                variant="solid"
                className="text-black"
                onPress={() => {
                  if (valueInput) {
                    console.log("Input value:", valueInput);
                    setFlightOffers([]);
                    setOfferDetails([]);
                    setLoading(true);
                    fetchOffers();
                  } else {
                    alert("Por favor, ingresa un aeropuerto para buscar.");
                  }
                }}
              >
                Buscar
              </Button>
            </div>
          </div>

          <div className="min-h-[30vh] flex items-center justify-center">
            {renderFlightMessage()}
          </div>
        </div>
      </section>
    </>
  );
}
