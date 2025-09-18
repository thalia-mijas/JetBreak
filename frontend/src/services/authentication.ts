export async function register(userData: {
  name: string;
  email: string;
  password: string;
}) {
  const url = `http://localhost:3000/api/register`;

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

    console.log("Ofertas obtenidas: ", data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function login(email: string, password: string) {
  const url = `http://localhost:3000/api/login`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Login response: ", data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  const url = `http://localhost:3000/api/logout`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Logout response: ", data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function recoverPassword(email: string) {
  const url = `http://localhost:3000/api/recover-password`;

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

    console.log("Recover password response: ", data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function resetPassword(token: string, newPassword: string) {
  const url = `http://localhost:3000/api/reset-password`;

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

    console.log("Reset password response: ", data);

    return data;
  } catch (error) {
    console.error(error);
  }
}
