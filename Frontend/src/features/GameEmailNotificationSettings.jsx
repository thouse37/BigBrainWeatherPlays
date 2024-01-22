import { useEffect, useState } from "react";
import Button from "../ui/Button.jsx";
import { useQuery } from "@tanstack/react-query";
import {
  fetchNotificationSettings,
  handleSaveNotificationSettings,
} from "../services/apiEmailNotifications.js";
import { useAuth } from "../contexts/AuthContext.jsx";

function GameEmailNotificationSettings({ gameId }) {
  const auth = useAuth();
  const [notificationTime, setNotificationTime] = useState(24);

  // Use React Query to fetch notification settings
  const { data: notificationSettingsData } = useQuery({
    queryKey: ["notificationSettings"],
    queryFn: () => fetchNotificationSettings(auth.token),
    enabled: !!auth.token,
  });

  console.log(notificationSettingsData?.notificationTime);

  useEffect(() => {
    if (notificationSettingsData) {
      const newNotificationTime = notificationSettingsData.notificationTime;
      setNotificationTime(newNotificationTime);
    }
  }, [notificationSettingsData]);

  const handleSave = () => {
    // Call the function to save notification settings
    handleSaveNotificationSettings(notificationTime, auth.token);
  };

  return (
    <div className="m-16">
      <h2>Email Notification Settings</h2>
      <div className="flex items-center space-x-5 mt-3">
        <div className="pb-6 mx-8 mt-8 ">
          <select
            onChange={(e) => setNotificationTime(Number(e.target.value))}
            className="bg-blue-900 text-blue-300 text-center py-2 px-4 border border-blue-400 rounded shadow"
            value={notificationTime}
          >
            <option value={0.5}>30 minutes before game start</option>
            <option value={1}>1 hour before game start</option>
            <option value={2}>2 hours before game start</option>
            <option value={5}>5 hours before game start</option>
            <option value={24}>24 hours before game start</option>
            <option value={48}>48 hours before game start</option>
            <option value={72}>72 hours before game start</option>
          </select>
        </div>
        <div className="mx-16 mt-2">
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GameEmailNotificationSettings;
