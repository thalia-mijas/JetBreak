import { Badge, Button, Card, CardHeader, Input } from "@heroui/react";
import { AlertCircle, Plane, Search, X } from "lucide-react";

export default function Tracking() {
  const trackingFlights = [
    {
      id: "track-1",
      flightNumber: "IB6254",
      airline: "Iberia",
      route: "MAD → BCN",
      departure: "14:30",
      arrival: "15:45",
      status: "En vuelo",
      progress: 65,
      gate: "B12",
      terminal: "1",
      delay: 0,
      lastUpdate: "Hace 2 min",
      notifications: 2,
    },
    {
      id: "track-2",
      flightNumber: "VY2108",
      airline: "Vueling",
      route: "BCN → CDG",
      departure: "18:20",
      arrival: "20:15",
      status: "Retrasado",
      progress: 0,
      gate: "A8",
      terminal: "2",
      delay: 25,
      lastUpdate: "Hace 5 min",
      notifications: 1,
    },
    {
      id: "track-3",
      flightNumber: "UX9087",
      airline: "Air Europa",
      route: "MAD → LHR",
      departure: "16:20",
      arrival: "17:35",
      status: "Aterrizó",
      progress: 100,
      gate: "C4",
      terminal: "1",
      delay: 0,
      lastUpdate: "Hace 1 min",
      notifications: 0,
    },
  ];

  return (
    <>
      <section id="seguimiento" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Seguimiento de Vuelos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mantente informado sobre el estado de tus vuelos en tiempo real
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Add Flight Form */}
            <Card className="mb-8 p-6">
              <CardHeader>
                <h2 className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-[#56DFCF]" />
                  Agregar Vuelo al Seguimiento
                </h2>
              </CardHeader>
              <div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Ingresa el número de vuelo (ej: IB6254, BA1234)"
                      className="text-lg"
                    />
                  </div>
                  <Button className="bg-[#56DFCF] hover:bg-[#4BC5B5]">
                    <Plane className="h-4 w-4 mr-2" />
                    Seguir
                  </Button>
                </div>
              </div>
            </Card>

            {/* Tracked Flights */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Vuelos Seguidos
                </h3>
                <div className="bg-[#56DFCF]/10 text-[#56DFCF] border-[#56DFCF]/20">
                  3 vuelos activos
                </div>
              </div>

              {/* Tracked Flight Cards */}
              {trackingFlights.map((flight) => {
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case "En vuelo":
                      return "bg-[#56DFCF]/10 text-[#56DFCF] border-[#56DFCF]/20";
                    case "Retrasado":
                      return "bg-orange-100 text-orange-700 border-orange-200";
                    case "Aterrizó":
                      return "bg-green-100 text-green-700 border-green-200";
                    default:
                      return "bg-gray-100 text-gray-700 border-gray-200";
                  }
                };

                return (
                  <Card
                    key={flight.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#56DFCF]/10 rounded-lg flex items-center justify-center">
                            <Plane className="h-6 w-6 text-[#56DFCF]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-lg">
                                {flight.flightNumber}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {flight.airline}
                              </Badge>
                              {flight.notifications > 0 && (
                                <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">
                                  {flight.notifications}
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 font-medium">
                              {flight.route}
                            </p>
                            <p className="text-sm text-gray-500">
                              {flight.departure} - {flight.arrival} • Terminal{" "}
                              {flight.terminal} • Puerta {flight.gate}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={getStatusColor(flight.status)}
                          >
                            {flight.status}
                          </Badge>
                          {flight.delay > 0 && (
                            <p className="text-sm text-orange-600 mt-1">
                              +{flight.delay} min
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {flight.lastUpdate}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Progreso del vuelo</span>
                          <span>{flight.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#56DFCF] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${flight.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Recent Updates */}
                      {flight.notifications > 0 && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-blue-900">
                                Actualización reciente
                              </p>
                              <p className="text-sm text-blue-700">
                                {flight.status === "Retrasado"
                                  ? `Vuelo retrasado ${flight.delay} minutos debido a condiciones meteorológicas`
                                  : "Cambio de puerta de embarque"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
