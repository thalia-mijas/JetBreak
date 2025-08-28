import { Button, Card, CardHeader, DateInput, Input } from "@heroui/react";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { MessageSquare } from "lucide-react";
import { useState } from "react";

export default function Claims() {
  const [value, setValue] = useState<CalendarDate | null>(null);

  const formatter = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full", // Puedes usar 'medium', 'short', etc.
  });

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
                  <select className="w-full p-2 border rounded-md">
                    <option>Retraso de vuelo</option>
                    <option>Cancelación de vuelo</option>
                    <option>Equipaje perdido</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Número de Vuelo</label>
                  <Input placeholder="Ej: IB6254" />
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
                  />
                </div>
                <Button className="w-full mb-4">Enviar Reclamo</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
