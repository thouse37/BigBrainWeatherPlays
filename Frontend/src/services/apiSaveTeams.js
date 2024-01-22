const apiUrl = import.meta.env.VITE_API_URL;

export const saveSelectedTeams = async (selectedTeams, token, endpoint) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ selectedTeams }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to save selected teams");
  }

  return await response.json();
};

export const fetchSavedTeams = async (token, endpoint) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch saved teams");
  }

  return await response.json();
};
