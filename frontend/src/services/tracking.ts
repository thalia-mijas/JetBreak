export async function getTrackingFlights() {
  const userId = localStorage.getItem("user_id");
  if (!userId) {
    throw new Error("User ID not found");
  }
  const url = `http://localhost:3000/api/flights/tracking/${userId}`;

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

export async function addTrackingFlight(flightData: {
  user_id: number;
  flight_iata: string;
  date: string;
}) {
  const url = `http://localhost:3000/api/flights/tracking`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(flightData),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function removeTrackingFlight(trackingId: number) {
  const url = `http://localhost:3000/api/flights/tracking/${trackingId}`;

  const options = {
    method: "DELETE",
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
