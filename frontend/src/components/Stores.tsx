import { Card } from "@heroui/react";

export default function Stores({
  selectedAirport,
}: {
  selectedAirport: string;
}) {
  const stores = [
    {
      id: "4d7d729279c4b1f767e30df3",
      name: "Juan Valdez",
      icon: "https://ss3.4sqi.net/img/categories_v2/food/cafe_bg_64.png",
      category: "Café",
    },
    {
      id: "4f4998a7e4b030691a8f7d79",
      name: "Duty Free Aereopuerto Jose Joaquin De Olmedo",
      icon: "https://ss3.4sqi.net/img/categories_v2/shops/default_bg_64.png",
      category: "Tienda duty free",
    },
    {
      id: "5c51eef9c58ed7002c3694a8",
      name: "McDonald's",
      icon: "https://ss3.4sqi.net/img/categories_v2/food/fastfood_bg_64.png",
      category: "Restaurante de comida rápida",
    },
    {
      id: "4dbb3acb4b222080d372d7a8",
      name: "City Bistro",
      icon: "https://ss3.4sqi.net/img/categories_v2/food/gastropub_bg_64.png",
      category: "Gastropub",
    },
    {
      id: "4efb660777c8e88f4b44e793",
      name: "República Del Cacao",
      icon: "https://ss3.4sqi.net/img/categories_v2/shops/candystore_bg_64.png",
      category: "Tienda de golosinas",
    },
    {
      id: "4e65199c1495676d56df3e8d",
      name: "Arrecife Bar Restaurant",
      icon: "https://ss3.4sqi.net/img/categories_v2/food/default_bg_64.png",
      category: "Restaurante",
    },
    {
      id: "4e89a7819a52f9bbd0e982a7",
      name: "Cafe Du Port",
      icon: "https://ss3.4sqi.net/img/categories_v2/food/breakfast_bg_64.png",
      category: "Café",
    },
    {
      id: "4e9b7c865503cfce74a76f0a",
      name: "KFC",
      icon: "https://ss3.4sqi.net/img/categories_v2/food/friedchicken_bg_64.png",
      category: "Local de pollo frito",
    },
  ];

  console.log("Imprimiedo desde stores: ", selectedAirport);

  return (
    <>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tiendas y Servicios
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora las tiendas y restaurantes disponibles en el aeropuerto
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stores.map((store) => {
            return (
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
            );
          })}
        </div>
      </div>
    </>
  );
}
