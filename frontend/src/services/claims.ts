import type { Claim } from "../models/claim";

const API_URL = import.meta.env.VITE_API_URL;

export async function getClaimsUser() {
  const userId = localStorage.getItem("user_id");
  if (!userId) {
    throw new Error("User ID not found in local storage");
  }

  const url = `${API_URL}api/claims/byUser/${userId}`;

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
  const url = `${API_URL}api/claims`;

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

export async function deleteClaim(claimId: number) {
  const url = `${API_URL}api/claims/${claimId}`;

  const options = {
    method: "DELETE",
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Reclamo eliminado: ", data);

    return data;
  } catch (error) {
    console.error(error);
  }
}
