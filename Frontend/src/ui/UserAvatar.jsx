import { useState, useEffect } from "react";
import { fetchAvatar } from "../services/apiFetchAvatar.js";

function UserAvatar({ avatar, height = "h-16" }) {
  const token = localStorage.getItem("token");

  // Extract just the filename from the avatar path
  const avatarFilename = avatar ? avatar.split("/").pop() : null;

  const [avatarUrl, setAvatarUrl] = useState(
    avatarFilename || "/default-user.jpg"
  );

  useEffect(() => {
    if (avatarFilename) {
      fetchAvatar(avatarFilename, token)
        .then((blob) => {
          setAvatarUrl(URL.createObjectURL(blob));
        })
        .catch(() => {
          setAvatarUrl("/default-user.jpg");
        });
    }
  }, [avatarFilename, token]);

  return (
    <div>
      <img
        className={`rounded-full ${height}`}
        src={avatarUrl}
        alt="User Avatar"
      />
    </div>
  );
}

export default UserAvatar;
