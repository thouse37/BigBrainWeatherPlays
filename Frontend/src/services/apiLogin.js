const apiUrl = import.meta.env.VITE_API_URL;

export async function login(loginData) {
  const response = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error(
      "Login failed, please check your credentials and try again."
    );
  }

  const data = await response.json();

  return data;
}
