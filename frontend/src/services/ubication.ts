const API_URL = import.meta.env.VITE_API_URL;

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

  const url = `${API_URL}/api/airports/gps/${latitude}/${longitude}`;

  const options = {
    method: "GET",
  };

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new (data.message ?? "Error fetching airport from location")();
  }

  return data;
}
