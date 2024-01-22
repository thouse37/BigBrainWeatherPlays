const apiUrl = import.meta.env.VITE_API_URL;

export const fetchUserProfileApi = async (token) => {
  const response = await fetch(`${apiUrl}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch user profile");
  }

  return await response.json();
};

export const updateUsernameApi = async ({ token, username }) => {
  const response = await fetch(`${apiUrl}/user/username`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update username");
  }

  return await response.json();
};

export const updatePasswordApi = async ({ token, password }) => {
  const response = await fetch(`${apiUrl}/user/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update password");
  }

  return await response.json();
};

export const updateEmailApi = async ({ token, email }) => {
  const response = await fetch(`${apiUrl}/user/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
};

export const updateAvatarApi = async ({ token, avatar }) => {
  const formData = new FormData();
  formData.append("avatar", avatar);

  const response = await fetch(`${apiUrl}/user/avatar`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update avatar");
  }

  return await response.json();
};
