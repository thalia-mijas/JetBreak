export async function getFlights(codeIata: string, type: string) {
  const url = `http://localhost:3000/api/flights/${type}/${codeIata}`;

  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
