export async function getOffers(airportCode: string) {
  const url = `http://localhost:3000/api/offers/${airportCode}`;

  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Ofertas obtenidas: ", data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getOfferDetails(conf: string) {
  const url = `http://localhost:3000/api/offers/detail/${conf}`;

  console.log("Fetching offer details from URL: ", url);

  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Detalles de oferta obtenidos: ", data);

    return data;
  } catch (error) {
    console.error(error);
  }
}
