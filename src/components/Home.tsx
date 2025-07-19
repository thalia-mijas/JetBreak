import { Button, Input, Tab, Tabs } from "@heroui/react";
import { MapPin, RefreshCw, Search } from "lucide-react";

export default function Home() {
  const selectedAirport = "Madrid, MAD, Barajas"; // Example selected airport
  const lastUpdated = new Date(); // Example last updated time
  const loading = false; // Example loading state
  const refetch = () => {
    // Logic to refetch flight information
    console.log("Refetching flight information...");
  };

  return (
    <>
      <section>
        <div className="bg-gradient-to-br from-[#56DFCF]/10 to-[#56DFCF]/20 py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Encuentra tu aeropuerto
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Busca tu aeropuerto para consultar información de vuelos.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2 p-2 bg-white rounded-lg shadow-lg">
                <div className="flex-1 relative">
                  <Input
                    placeholder="(ej: Madrid, MAD, Barajas)"
                    className="pl-2 pt-2 border-0 focus-visible:ring-0 align-self-center"
                  />
                </div>
                <Button className="bg-[#56DFCF] hover:bg-[#4BC5B5] rounded-[10px] pl-4 pr-4 pt-2 pb-2 flex">
                  <Search className="h-5 w-5" />
                  Buscar
                </Button>
              </div>
            </div>

            {/* Use location */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button className="border-[#56DFCF] border-2 hover:bg-[#56DFCF] hover:text-black transition-colors rounded-[10px] pl-4 pr-4 pt-2 pb-2 flex">
                <MapPin className="h-5 w-5" />
                Utilizar mi ubicación
              </Button>
            </div>
          </div>
        </div>

        <div id="vuelos" className="py-16 bg-[#EAEFEF]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Información de vuelos
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Consulta llegadas, salidas y estado de vuelos en tiempo real
              </p>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Aeropuerto:</label>
                <label className="text-sm font-medium">{selectedAirport}</label>
              </div>

              <div className="flex items-center gap-4">
                {lastUpdated && (
                  <span className="text-sm text-gray-500">
                    Actualizado: {lastUpdated.toLocaleTimeString("es-ES")}
                  </span>
                )}
                <Button
                  variant="bordered"
                  size="sm"
                  onClick={refetch}
                  disabled={loading}
                  className="border-[#56DFCF] border-2 hover:bg-[#56DFCF] hover:text-black transition-colors rounded-[10px] flex items-center p-2 bg-transparent"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                  />
                  Actualizar
                </Button>
              </div>
            </div>

            <Tabs
              aria-label="Options"
              classNames={{
                tabList:
                  "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-[#56DFCF]",
                tab: "max-w-fit px-0 h-12",
                tabContent: "group-data-[selected=true]:text-[#56DFCF]",
              }}
              color="primary"
              variant="underlined"
            >
              <Tab
                key="arrivals"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Llegadas</span>
                  </div>
                }
              >
                Se supne que muestra llegadas
              </Tab>
              <Tab
                key="departures"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Salidas</span>
                  </div>
                }
              >
                Se supne que muestra salidas
              </Tab>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}
