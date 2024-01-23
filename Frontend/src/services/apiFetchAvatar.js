const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAvatar = async (avatarPath, token) => {
  try {
    const response = await fetch(`${apiUrl}/user/avatar/${avatarPath}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.blob(); // Assuming the server sends an image file
  } catch (error) {
    console.error("Error fetching avatar:", error);
    return null; // Or return a path to a default avatar image
  }
};
