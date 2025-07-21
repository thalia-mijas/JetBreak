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
        <div className="from-primary/10 to-primary/20 bg-gradient-to-br py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-6xl">
                Encuentra tu aeropuerto
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Busca tu aeropuerto para consultar información de vuelos.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mx-auto max-w-2xl">
              <div className="flex gap-2 rounded-lg bg-white p-2 shadow-lg">
                <div className="relative flex-1">
                  <Input
                    placeholder="(ej: Madrid, MAD, Barajas)"
                    className="align-self-center border-0 pt-2 pl-2 focus-visible:ring-0"
                  />
                </div>
                <Button className="bg-primary flex rounded-[10px] pt-2 pr-4 pb-2 pl-4 hover:bg-[#4BC5B5]">
                  <Search className="h-5 w-5" />
                  Buscar
                </Button>
              </div>
            </div>

            {/* Use location */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button className="border-primary hover:bg-primary flex rounded-[10px] border-2 pt-2 pr-4 pb-2 pl-4 transition-colors hover:text-black">
                <MapPin className="h-5 w-5" />
                Utilizar mi ubicación
              </Button>
            </div>
          </div>
        </div>

        <div id="vuelos" className="bg-[#EAEFEF] py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Información de vuelos
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Consulta llegadas, salidas y estado de vuelos en tiempo real
              </p>
            </div>

            <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
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
                  className="border-primary hover:bg-primary flex items-center rounded-[10px] border-2 bg-transparent p-2 transition-colors hover:text-black"
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
                cursor: "w-full bg-primary",
                tab: "max-w-fit px-0 h-12",
                tabContent: "group-data-[selected=true]:text-primary",
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
                Se supone que muestra llegadas
              </Tab>
              <Tab
                key="departures"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Salidas</span>
                  </div>
                }
              >
                Se supone que muestra salidas
              </Tab>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}
