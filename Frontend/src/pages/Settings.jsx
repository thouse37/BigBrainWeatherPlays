import { useAuth } from "../contexts/AuthContext.jsx";

import PleaseLogin from "../ui/PleaseLogin.jsx";
import UserProfile from "./UserProfile.jsx";

function Settings() {
  const auth = useAuth();
  if (!auth.token) {
    return <PleaseLogin />;
  }
  return <UserProfile></UserProfile>;
}

export default Settings;
