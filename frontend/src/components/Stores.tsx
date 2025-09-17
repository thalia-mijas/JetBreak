import { Card } from "@heroui/react";
import { useEffect, useState } from "react";
import * as API from "../services/stores";

export default function Stores({
  selectedAirport,
}: {
  selectedAirport: string;
}) {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    API.getStores(selectedAirport)
      .then((data) => {
        console.log("Datos de tiendas obtenidos: ", data);
        setStores(data);
      })
      .catch((err) => {
        console.error("Error fetching stores: ", err);
      });
  }, [selectedAirport]);

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tiendas y Servicios
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora las tiendas y restaurantes disponibles en el aeropuerto
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stores.map((store) => (
            <Card
              key={store.id}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="p-6">
                {/* Store Icon and Category Badge */}
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div className="w-16 h-16 bg-white rounded-xl shadow-sm border flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
                    <img
                      src={store.icon || "/placeholder.svg"}
                      alt={store.name}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = "/local-grocery-store.png";
                      }}
                    />
                  </div>
                  <div className="text-xs px-1 py-1 rounded-full bg-[#56DFCF] text-white text-center">
                    {store.category}
                  </div>
                </div>

                {/* Store Name */}
                <div className="mb-3">
                  <h3
                    className="font-semibold text-lg text-gray-900 mb-1"
                    title={store.name}
                  >
                    {store.name}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
