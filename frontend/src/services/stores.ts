const API_URL = import.meta.env.VITE_API_URL;

export async function getStores(iataCode: string) {
  const url = `${API_URL}/api/airports/${iataCode}`;

  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const latitude = data.latitude;
    const longitude = data.longitude;
    console.log("Ubicación del aeropuerto: ", { latitude, longitude });

    const url2 = `${API_URL}/api/stores/${latitude}/${longitude}`;

    try {
      const response2 = await fetch(url2, options);
      const data2 = await response2.json();
      console.log("Tiendas obtenidas: ", data2);
      return data2;
    } catch (error) {
      console.error("Error fetching stores: ", error);
    }
  } catch (error) {
    console.error(error);
  }
}
