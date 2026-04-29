const API_URL = import.meta.env.VITE_API_URL;

export async function getAirports() {
  const url = `${API_URL}api/airports`;

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
