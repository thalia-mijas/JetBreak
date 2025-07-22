import { Badge, Button, Card, CardHeader } from "@heroui/react";
import { ArrowRight, Star } from "lucide-react";

export default function Offers() {
  const offersItems = [
    {
      destination: "París",
      price: "€89",
      originalPrice: "€149",
      airline: "Vueling",
      duration: "2h 15m",
      discount: "40% OFF",
    },
    {
      destination: "Londres",
      price: "€125",
      originalPrice: "€200",
      airline: "Iberia",
      duration: "2h 30m",
      discount: "37% OFF",
    },
    {
      destination: "Roma",
      price: "€95",
      originalPrice: "€160",
      airline: "Ryanair",
      duration: "2h 45m",
      discount: "41% OFF",
    },
  ];
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offersItems.map((offer, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xl">{offer.destination}</div>
                      <div>
                        {offer.airline} • {offer.duration}
                      </div>
                    </div>
                    <Badge className="bg-red-500 hover:bg-red-600">
                      {offer.discount}
                    </Badge>
                  </div>
                </CardHeader>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-[#56DFCF]">
                        {offer.price}
                      </span>
                      <span className="text-lg text-gray-500 line-through ml-2">
                        {offer.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4" />
                    </div>
                  </div>
                  <Button
                    color="primary"
                    endContent={<ArrowRight className="h-4 w-4 ml-2" />}
                    variant="light"
                    className="w-full"
                  >
                    Ver itinerario
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
