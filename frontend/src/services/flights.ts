const API_URL = import.meta.env.VITE_API_URL;

export async function getFlights(codeIata: string, type: string) {
  const url = `${API_URL}api/flights/${type}/${codeIata}`;

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
