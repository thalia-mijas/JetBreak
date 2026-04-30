const API_URL = import.meta.env.VITE_API_URL;

export async function register(userData: {
  name: string;
  email: string;
  password: string;
}) {
  const url = `${API_URL}api/register`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function login(email: string, password: string) {
  const url = `${API_URL}api/login`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include" as RequestCredentials,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function me() {
  const url = `${API_URL}api/me`;

  const options = {
    method: "GET",
    credentials: "include" as RequestCredentials,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function logout() {
  const url = `${API_URL}api/logout`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include" as RequestCredentials, // Include cookies in the request
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function recoverPassword(email: string) {
  const url = `${API_URL}api/recover-password`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function resetPassword(token: string, newPassword: string) {
  const url = `${API_URL}api/reset-password`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, newPassword }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
