function UserAvatar({ avatar, height = "h-16" }) {
  return (
    <div>
      <img
        className={`rounded-full ${height}`}
        src={avatar || "/default-user.jpg"}
        alt="User Avatar"
      />
    </div>
  );
}

export default UserAvatar;
