const apiUrl = import.meta.env.VITE_API_URL;

export const resetPasswordApi = async ({ token, password }) => {
  const response = await fetch(`${apiUrl}/password-reset/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to reset password");
  }

  return await response.json();
};

export const forgotPasswordApi = async (email) => {
  console.log("Sending request to forgotPasswordApi");
  const response = await fetch(`${apiUrl}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error response from server:", errorData);
    throw new Error(errorData.error || "Failed to send reset link");
  }
  const responseData = await response.json();
  console.log("Response from server:", responseData);
  return responseData;
};
