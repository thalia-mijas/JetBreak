export async function getOffers() {
  const url = `http://localhost:3000/api/offers/MAD/UIO/2025-09-27`;

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
