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
import { MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { Airport } from "../models/airport";
import * as API from "../services/airports";
import { getAirportFromUbication } from "../services/ubication";
import { CustomRadio } from "./CustomRadio";
import Flights from "./Flights";
import Stores from "./Stores";

export default function Home() {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAirport, setSelectedAirport] = useState(""); // Example selected airport
  const [valueInput, setValueInput] = useState(""); // Example input value
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [choiceAirport, setChoiceAirport] = useState("");
  const [selected, setSelected] = useState("flight");

  useEffect(() => {
    API.getAirports()
      .then((data) => {
        setAirports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Cargando aeropuertos...</p>
      </div>
    );
  } else {
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
                      {Array.isArray(airports) &&
                        airports.map((airport) => (
                          <option
                            key={airport.iata_code}
                            value={airport.iata_code}
                          >
                            {airport.name} ({airport.iata_code})
                          </option>
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
                        console.log("Input value:", valueInput);
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
                  onPress={() => {
                    onOpen();
                    getAirportFromUbication();
                  }}
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
                                key={airport.iata_code}
                                description={`Airport code: ${airport.iata_code}`}
                                value={airport.iata_code}
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

          {/* Información de vuelos y tiendas */}
          {!selectedAirport ? (
            <div className="container mx-auto px-4 md:px-6 py-16">
              <p className="text-center text-gray-600">
                Por favor, selecciona un aeropuerto para ver la información de
                vuelos y tiendas.
              </p>
            </div>
          ) : (
            <div className="p-2">
              <Tabs
                fullWidth
                aria-label="Tabs form"
                selectedKey={selected}
                size="md"
                onSelectionChange={(key) => setSelected(key as string)}
              >
                <Tab key="flight" title="Vuelos">
                  <Flights selectedAirport={selectedAirport} />
                </Tab>
                <Tab key="stores" title="Tiendas">
                  <Stores selectedAirport={selectedAirport} />
                </Tab>
              </Tabs>
            </div>
          )}
        </section>
      </>
    );
  }
}
