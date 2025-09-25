import type { Claim } from "../models/claim";

export async function getClaimsUser() {
  const userId = localStorage.getItem("user_id");
  if (!userId) {
    throw new Error("User ID not found in local storage");
  }

  const url = `http://localhost:3000/api/claims/byUser/${userId}`;

  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Reclamos obtenidos: ", data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createClaim(claim: Partial<Claim>) {
  const url = `http://localhost:3000/api/claims`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(claim),
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
