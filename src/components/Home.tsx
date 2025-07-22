import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  RadioGroup,
  Tab,
  Tabs,
  useDisclosure,
} from "@heroui/react";
import { MapPin, RefreshCw, Search } from "lucide-react";
import { useState } from "react";
import { CustomRadio } from "./CustomRadio";

export default function Home() {
  const airports = [
    {
      name: "Adolfo Suárez Madrid-Barajas Airport",
      iataCode: "MAD",
      city: "Madrid",
    },
    {
      name: "Barcelona-El Prat Airport",
      iataCode: "BCN",
      city: "Barcelona",
    },
    {
      name: "Málaga-Costa del Sol Airport",
      iataCode: "AGP",
      city: "Málaga",
    },
    {
      name: "Mariscal Sucre International Airport",
      iataCode: "UIO",
      city: "Quito",
    },
    {
      name: "José Joaquín de Olmedo International Airport",
      iataCode: "GYE",
      city: "Guayaquil",
    },
    {
      name: "Catamayo Airport",
      iataCode: "LOH",
      city: "Loja",
    },
  ];

  const [selectedAirport, setSelectedAirport] = useState(""); // Example selected airport
  const [valueInput, setValueInput] = useState(""); // Example input value
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [choiceAirport, setChoiceAirport] = useState("");

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
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                    list="airport-suggestions"
                  />
                  <datalist id="airport-suggestions">
                    {airports.map((airport) => (
                      <option
                        key={airport.iataCode}
                        value={`${airport.name} (${airport.iataCode})`}
                      />
                    ))}
                  </datalist>
                </div>
                <Button
                  color="primary"
                  startContent={<Search className="h-5 w-5" />}
                  variant="solid"
                  className="text-black"
                  onPress={() => {
                    if (valueInput) {
                      setSelectedAirport(valueInput);
                    } else {
                      alert("Por favor, ingresa un aeropuerto para buscar.");
                    }
                  }}
                >
                  Buscar
                </Button>
              </div>
            </div>

            {/* Use location */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                color="primary"
                startContent={<MapPin className="h-5 w-5" />}
                variant="shadow"
                className="text-black"
                onPress={onOpen}
              >
                Utilizar mi ubicación
              </Button>
              <Modal
                isOpen={isOpen}
                placement="center"
                onOpenChange={onOpenChange}
                backdrop="blur"
                scrollBehavior="inside"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Obteniendo ubicación de tu dispositivo
                        <p className="text-gray-500 text-sm">
                          Escoge un aeropuerto de la lista
                        </p>
                      </ModalHeader>
                      <ModalBody>
                        <RadioGroup
                          value={choiceAirport}
                          onValueChange={setChoiceAirport}
                        >
                          {airports.map((airport) => (
                            <CustomRadio
                              key={airport.iataCode}
                              description={`Airport code: ${airport.iataCode}`}
                              value={airport.name}
                            >
                              {airport.name}
                            </CustomRadio>
                          ))}
                        </RadioGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Cancelar
                        </Button>
                        <Button
                          color="primary"
                          onPress={() => {
                            if (!choiceAirport) {
                              alert("Por favor, selecciona un aeropuerto.");
                              return;
                            }
                            setSelectedAirport(choiceAirport);
                            setValueInput(choiceAirport);
                            setSelectedAirport(choiceAirport);
                            onClose();
                          }}
                        >
                          Aceptar
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
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
                  color="primary"
                  startContent={
                    <RefreshCw
                      className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                    />
                  }
                  size="sm"
                  onPress={refetch}
                  disabled={loading}
                >
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
