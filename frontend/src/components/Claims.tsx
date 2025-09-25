import {
  addToast,
  Button,
  Card,
  CardHeader,
  DateInput,
  Input,
} from "@heroui/react";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { Calendar, MessageSquare, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import type { Claim } from "../models/claim";
import * as API from "../services/claims";

export default function Claims() {
  const [value, setValue] = useState<CalendarDate | null>(null);
  const { isAuthenticated } = useAuth();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [claimType, setClaimType] = useState<string>("Retraso de vuelo");
  const [flightNumber, setFlightNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    API.getClaimsUser()
      .then((data: Claim[]) => {
        console.log("Reclamos obtenidos: ", data);
        setClaims(data);
      })
      .catch((err: unknown) => {
        console.error("Error fetching claims: ", err);
      });
  }, []);

  const formatter = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full", // Puedes usar 'medium', 'short', etc.
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get random status for demo (since it's not in your data)
  const getRandomStatus = () => {
    const statuses = ["Pendiente", "En revisión", "Resuelto", "Rechazado"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  // Get claim type color
  const getClaimTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "retraso de vuelo":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "cancelación de vuelo":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "equipaje perdido":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleSubmit = () => {
    const userId = Number(localStorage.getItem("user_id"));
    if (!userId) {
      addToast({
        title: "Error de autenticación",
        description: "No se encontró el usuario. Inicia sesión nuevamente.",
        color: "danger",
        icon: <MessageSquare />,
      });
      navigate("/login");
      return;
    }
    API.createClaim({
      type: claimType,
      flight_iata: flightNumber,
      date: value ? value.toString() : "",
      description: description,
      user_id: userId,
    })
      .then((data) => {
        console.log("Reclamo creado: ", data);
        if (data.message === "Claim created successfully") {
          addToast({
            title: "Creación de reclamo",
            description: "El reclamo se ha creado con éxito",
            color: "success",
            icon: <MessageSquare />,
          });
          setClaims((prevClaims) => [...prevClaims, data.claim]);
          // Reset form
          setClaimType("Retraso de vuelo");
          setFlightNumber("");
          setDescription("");
          setValue(null);
        } else {
          addToast({
            title: "Error de creación de reclamo",
            description: data?.message || "No se pudo crear el reclamo",
            color: "danger",
            icon: <MessageSquare />,
          });
        }
      })
      .catch((err: unknown) => {
        console.error("Error creating claim: ", err);
      });
  };

  return (
    <>
      <section id="reclamos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Reclamos y Soporte
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ¿Tienes algún problema? Te ayudamos a resolverlo
            </p>
          </div>

          <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <MessageSquare className="h-6 w-6 mr-2 text-[#56DFCF]" />
                Presentar Reclamo
              </CardHeader>
              <p className="text-sm text-gray-500 mx-4">
                Reporta cualquier incidencia relacionada con tu vuelo o
                experiencia en el aeropuerto
              </p>
              <div className="space-y-4 mx-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Reclamo</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    onChange={(e) => setClaimType(e.target.value)}
                  >
                    <option>Retraso de vuelo</option>
                    <option>Cancelación de vuelo</option>
                    <option>Equipaje perdido</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Número de Vuelo</label>
                  <Input
                    placeholder="Ej: IB6254"
                    onChange={(e) => setFlightNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha de Vuelo</label>
                  <I18nProvider locale="es-ES">
                    <DateInput onChange={setValue} />
                    <p className="text-default-500 text-sm">
                      Fecha seleccionada:{" "}
                      {value
                        ? formatter.format(value.toDate(getLocalTimeZone()))
                        : "--"}
                    </p>
                  </I18nProvider>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descripción</label>
                  <textarea
                    className="w-full p-2 border rounded-md h-24 resize-none"
                    placeholder="Describe tu problema..."
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <Button className="w-full mb-4" onPress={() => handleSubmit()}>
                  Enviar Reclamo
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* List of claims */}
        {isAuthenticated && claims.length > 0 ? (
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Historial de Reclamos
              </h3>
            </div>

            {claims.map((claim) => {
              const status = getRandomStatus();

              return (
                <Card
                  key={claim.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#56DFCF]/10 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-6 w-6 text-[#56DFCF]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-lg">
                              Reclamo #{claim.id}
                            </h4>
                            <div
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${getClaimTypeColor(claim.type)}`}
                            >
                              {claim.type}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Plane className="h-4 w-4 text-[#56DFCF]" />
                                <span className="font-medium">
                                  Vuelo: {claim.flight_iata}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-[#56DFCF]" />
                                <span>
                                  Fecha del vuelo: {formatDate(claim.date)}
                                </span>
                              </div>
                            </div>

                            <p className="text-gray-700 text-sm leading-relaxed">
                              {claim.description}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                              <span>
                                Creado: {formatDate(claim.createdAt)} a las{" "}
                                {formatTime(claim.createdAt)}
                              </span>
                              {claim.updatedAt !== claim.createdAt && (
                                <span>
                                  Actualizado: {formatDate(claim.updatedAt)} a
                                  las {formatTime(claim.updatedAt)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress indicator for status */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>Estado del reclamo</span>
                        <span>
                          {status === "Resuelto"
                            ? "100%"
                            : status === "En revisión"
                              ? "60%"
                              : status === "Pendiente"
                                ? "20%"
                                : "0%"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            status === "Resuelto"
                              ? "bg-green-500"
                              : status === "En revisión"
                                ? "bg-blue-500"
                                : status === "Pendiente"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                          }`}
                          style={{
                            width:
                              status === "Resuelto"
                                ? "100%"
                                : status === "En revisión"
                                  ? "60%"
                                  : status === "Pendiente"
                                    ? "20%"
                                    : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : null}
      </section>
    </>
  );
}
