import {
  addToast,
  Badge,
  Button,
  Card,
  CardHeader,
  Chip,
  DateInput,
  Input,
} from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import { ArrowRight, Plane, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { trackingFlight } from "../models/tracking";
import * as API from "../services/tracking";

export default function Tracking() {
  const flightStatus = [
    { key: "landed", label: "Aterrizado", color: "success" }, // verde
    { key: "scheduled", label: "Programado", color: "secondary" }, // azul
    { key: "cancelled", label: "Cancelado", color: "danger" }, // rojo
    { key: "active", label: "En vuelo", color: "success" }, // amarillo
    { key: "incident", label: "Incidente", color: "danger" }, // púrpura
    { key: "diverted", label: "Desviado", color: "warning" }, // marrón
    { key: "redirected", label: "Redirigido", color: "warning" }, // cian
    { key: "unknown", label: "Desconocido", color: "default" }, // gris
  ];
  const [trackingFlights, setTrackingFlights] = useState<trackingFlight[]>([]);
  const [dateValue, setDateValue] = useState<any>("");
  const [flightValue, setFlightValue] = useState<string>("");

  useEffect(() => {
    API.getTrackingFlights()
      .then((data) => {
        console.log("Datos de vuelos en seguimiento obtenidos: ", data);
        setTrackingFlights(data);
      })
      .catch((err) => {
        console.error("Error fetching tracking flights: ", err);
      });
  }, []);

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);

    const pad = (num: number) => String(num).padStart(2, "0");

    const day = pad(date.getUTCDate());
    const month = pad(date.getUTCMonth() + 1); // Los meses van de 0 a 11
    const year = date.getUTCFullYear();

    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}`;

    return { formattedDate, formattedTime };
  };

  const handleAddFlight = () => {
    if (!flightValue || !dateValue) {
      addToast({
        title: "Error al agregar vuelo",
        description: "Por favor, completa todos los campos",
        color: "danger",
        icon: <Plane />,
      });
      return;
    }

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      addToast({
        title: "Error de usuario",
        description: "ID de usuario no encontrado. Por favor, inicia sesión.",
        color: "danger",
        icon: <Plane />,
      });
      return;
    }

    const flightData = {
      user_id: parseInt(userId),
      flight_iata: flightValue,
      date: dateValue.toString(),
    };

    console.log("Adding flight to tracking: ", flightData);

    API.addTrackingFlight(flightData)
      .then((data) => {
        console.log("Flight added to tracking: ", data);
        if (data.message === "FlightTracking created successfully") {
          addToast({
            title: "Vuelo agregado",
            description: "El vuelo se ha agregado con éxito al seguimiento",
            color: "success",
            icon: <Plane />,
          });
          // Clear input fields
          setDateValue("");
          setFlightValue("");
          // Refetch tracking flights to include the newly added flight
          API.getTrackingFlights()
            .then((data) => {
              console.log("Updated tracking flights: ", data);
              setTrackingFlights(data);
            })
            .catch((err) => {
              console.error("Error fetching updated tracking flights: ", err);
            });
        } else {
          addToast({
            title: "Error al agregar vuelo",
            description: data?.message || "No se pudo agregar el vuelo",
            color: "danger",
            icon: <Plane />,
          });
        }
      })
      .catch((err) => {
        console.error("Error adding tracking flight: ", err);
      });
  };

  const handleDeleteFlight = (trackingId: number) => {
    API.removeTrackingFlight(trackingId)
      .then((data) => {
        console.log("Flight removed from tracking: ", data);
        if (data.message === "FlightTracking deleted successfully") {
          addToast({
            title: "Seguimiento eliminado",
            description: "El seguimiento se ha eliminado con éxito",
            color: "success",
            icon: <Plane />,
          });
        } else {
          addToast({
            title: "Error de eliminación de seguimiento",
            description: data?.message || "No se pudo eliminar el seguimiento",
            color: "danger",
            icon: <Plane />,
          });
        }
        setTrackingFlights((prevFlights) =>
          prevFlights.filter((flight) => flight.id !== trackingId)
        );
      })
      .catch((err) => {
        console.error("Error removing tracking flight: ", err);
      });
  };

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
                  Agregar Vuelo
                </h2>
              </CardHeader>
              <div className="w-full">
                <div className="w-full flex justify-between gap-4 flex-col md:flex-row">
                  <div className="w-1/3 space-y-2">
                    <label className="text-sm font-medium">
                      Número de Vuelo
                    </label>
                    <Input
                      placeholder="Ingresa el número de vuelo (ej: IB6254, BA1234)"
                      className="text-lg"
                      onChange={(e) =>
                        setFlightValue(e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <div className="w-1/3 space-y-2">
                    <label className="text-sm font-medium">
                      Fecha de Vuelo
                    </label>
                    <I18nProvider locale="es-ES">
                      <DateInput onChange={setDateValue} />
                    </I18nProvider>
                  </div>
                  <Button
                    className="w-1/3 self-end bg-[#56DFCF] hover:bg-[#4BC5B5]"
                    onPress={() => {
                      handleAddFlight();
                    }}
                  >
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
              </div>

              {/* Tracked Flight Cards */}
              {trackingFlights.map((flight) => {
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
                                {flight.flight_iata}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {flight.airline.name}
                              </Badge>
                            </div>
                            <p className="text-gray-600 font-medium">
                              {flight.origin.name}
                              <ArrowRight className="inline-block mx-1" />
                              {flight.destination.name}
                            </p>
                            {flight.date_departure &&
                              flight.date_arrival &&
                              (() => {
                                const {
                                  formattedDate: formattedDateDep,
                                  formattedTime: formattedTimeDep,
                                } = formatDateTime(flight.date_departure);
                                const {
                                  formattedDate: formattedDateArr,
                                  formattedTime: formattedTimeArr,
                                } = formatDateTime(flight.date_arrival);
                                return (
                                  <>
                                    <p className="text-sm text-gray-500">
                                      {formattedDateDep} - {formattedDateArr}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {formattedTimeDep} - {formattedTimeArr}
                                    </p>
                                  </>
                                );
                              })()}
                          </div>
                        </div>
                        <div className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 bg-transparent"
                            onPress={() => {
                              handleDeleteFlight(flight.id);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex gap-2">
                        <Chip
                          color={
                            flightStatus.find(
                              (status) => status.key === flight.state
                            )?.color || "default"
                          }
                          size="sm"
                          variant="flat"
                        >
                          {flightStatus.find(
                            (status) => status.key === flight.state
                          )?.label || "-"}
                        </Chip>
                      </div>
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
