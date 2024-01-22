import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const handleSaveNotificationSettings = async (
  notificationTime,
  token
) => {
  try {
    // Send a POST request to your backend to save the notification time
    const response = await fetch(`${apiUrl}/notification-settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        notificationTime,
      }),
    });

    if (response.ok) {
      toast.success("Notification settings saved successfully", {
        autoClose: 1500,
      });
    }
  } catch (error) {
    toast.error("Error saving notification settings:", error);
  }
};

export const fetchNotificationSettings = async (token) => {
  try {
    const response = await fetch(`${apiUrl}/notification-settings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notification settings");
    }

    const data = await response.json();
    console.log("Fetched Notification Settings Data:", data); // Log the fetched data
    return data;
  } catch (error) {
    throw new Error("Error fetching notification settings: " + error.message);
  }
};
