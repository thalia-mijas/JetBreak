import { Button, Card, CardHeader } from "@heroui/react";
import { ArrowRight, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import type { Offer } from "../models/offer";
import * as API from "../services/offers";

export default function Offers() {
  const [flightOffers, setFlightOffers] = useState<Offer[]>([]);

  const parseDuration = (duration: string) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!match) return duration;
    const hours = match[1] ? Number.parseInt(match[1]) : 0;
    const minutes = match[2] ? Number.parseInt(match[2]) : 0;
    return `${hours}h ${minutes}m`;
  };

  // Format date
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Extract price from total string
  const extractPrice = (total: string) => {
    const match = total.match(/([£€¥$]\d+(?:\.\d+)?|\d+(?:\.\d+)?\s*[A-Z]{3})/);
    return match ? match[0] : total;
  };

  // Shorten destination name
  const shortenLocation = (location: string) => {
    if (location.includes("International")) {
      return location
        .replace(" International Airport", "")
        .replace(" International", "");
    }
    return location.length > 20 ? location.substring(0, 20) + "..." : location;
  };

  useEffect(() => {
    API.getOffers()
      .then((data) => {
        console.log("Ofertas obtenidas: ", data);
        setFlightOffers(data);
      })
      .catch((err) => {
        console.error("Error fetching offers: ", err);
      });
  }, []);

  return (
    <>
      <section id="ofertas" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ofertas de Vuelos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre las mejores ofertas y promociones disponibles
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flightOffers.length > 0 ? (
              flightOffers.map((offer) => {
                return (
                  <Card
                    key={offer.id}
                    className="hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 bg-white rounded border flex items-center justify-center overflow-hidden">
                            <img
                              src={offer.icon || "/placeholder.svg"}
                              alt={offer.owner}
                              className="max-w-full max-h-full object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                if (e.currentTarget.nextElementSibling) {
                                  (
                                    e.currentTarget
                                      .nextElementSibling as HTMLElement
                                  ).style.display = "block";
                                }
                              }}
                            />
                            <div className="hidden text-xs font-bold text-gray-600">
                              {offer.owner.substring(0, 2)}
                            </div>
                          </div>
                          <div>
                            <span className="text-lg font-semibold">
                              {offer.flight}
                            </span>
                            <div className="text-sm text-gray-500">
                              {offer.owner} • {offer.class}
                            </div>
                          </div>
                          <div className="bg-[#56DFCF] px-4 py-2 rounded-full flex flex-col items-center">
                            <span className="text-2xl font-bold text-white">
                              {extractPrice(offer.total)}
                            </span>
                            <div className="text-xs text-white">por adulto</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Route Information */}
                    <div className=" p-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex flex-col items-start gap-2">
                          <div className="w-2 h-2 bg-[#56DFCF] rounded-full"></div>
                          <span className="font-medium">
                            {shortenLocation(offer.origin)}
                          </span>
                          <span>{formatTime(offer.departure)}</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-gray-500">
                          <div className="flex-1 h-px bg-gray-300"></div>
                          <Plane className="h-3 w-3 text-gray-400" />
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            {parseDuration(offer.duration)}
                          </span>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="font-medium">
                            {shortenLocation(offer.destination)}
                          </span>
                          <span>{formatTime(offer.arrival)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-0">
                      <Button className="w-full bg-[#56DFCF] hover:bg-[#4BC5B5]">
                        Ver detalles del vuelo
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                );
              })
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No se encontraron ofertas de vuelos disponibles.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
