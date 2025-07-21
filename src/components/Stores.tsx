import { Button, Card, CardHeader } from "@heroui/react";
import { Car, CheckCircle, Coffee, Gift, Wifi } from "lucide-react";

export default function Stores() {
  const storesItems = [
    {
      category: "Duty Free",
      icon: <Gift className="h-8 w-8" />,
      stores: ["World Duty Free", "Dufry", "Heinemann"],
      color: "bg-purple-100 text-purple-600",
    },
    {
      category: "Restaurantes",
      icon: <Coffee className="h-8 w-8" />,
      stores: ["Starbucks", "McDonald's", "Burger King"],
      color: "bg-orange-100 text-orange-600",
    },
    {
      category: "Servicios",
      icon: <Wifi className="h-8 w-8" />,
      stores: ["WiFi Gratis", "Carga Móvil", "Información"],
      color: "bg-[#56DFCF]/10 text-[#56DFCF]",
    },
    {
      category: "Transporte",
      icon: <Car className="h-8 w-8" />,
      stores: ["Alquiler Coches", "Taxi", "Metro"],
      color: "bg-green-100 text-green-600",
    },
  ];
  return (
    <>
      <section id="tiendas" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tiendas y Servicios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explora las tiendas, restaurantes y servicios disponibles en el
              aeropuerto
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storesItems.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    {category.icon}
                  </div>
                  <div>{category.category}</div>
                </CardHeader>
                <div>
                  <ul className="space-y-2">
                    {category.stores.map((store, storeIndex) => (
                      <li
                        key={storeIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {store}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="bordered"
                    className="w-full mt-4 bg-transparent"
                  >
                    Ver Más
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
