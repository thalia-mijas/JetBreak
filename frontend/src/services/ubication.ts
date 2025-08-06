export async function getUbication(): Promise<{
  latitude: number;
  longitude: number;
}> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log("Ubicación obtenida: ", { latitude, longitude });
        resolve({ latitude, longitude });
      },
      (error) => {
        console.error(error);
        reject(new Error("No se pudo obtener la ubicación actual."));
      }
    );
  });
}

export async function getAirportFromUbication() {
  const { latitude, longitude } = await getUbication();

  const response = await fetch(`airports.json`);
  const data = await response.json();

  data.map((airport) => {
    console.log("Comparando con aeropuerto: ", airport.iata_code);
    if (airport.latitude === latitude && airport.longitude === longitude) {
      console.log("Aeropuerto encontrado: ", airport);
      return airport;
    }
  });
}
