import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { NflProvider } from "./contexts/NflContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Homepage from "./pages/Homepage.jsx";
import Nfl from "./pages/Nfl.jsx";
import Mlb from "./pages/Mlb.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import TodaysGames from "./pages/TodaysGames.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Settings from "./pages/Settings.jsx";
import CustomTeams from "./pages/CustomTeams.jsx";
import FavoriteTeams from "./pages/FavoriteTeams.jsx";
import EmailSubscriptions from "./pages/EmailSubscriptions.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ContactUs from "./pages/ContactUs.jsx";

function App() {
  return (
    <GoogleOAuthProvider clientId="646484951810-4db4j9hlqdfrmr1mpminegsbvi7e3nco.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NflProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="nfl" element={<Nfl />} />
                  <Route path="mlb" element={<Mlb />} />
                  <Route path="todays-games" element={<TodaysGames />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="register" element={<Register />} />
                  <Route path="login" element={<Login />} />
                  <Route path="forgot-password" element={<ForgotPassword />} />
                  <Route
                    path="password-reset/:token"
                    element={<ResetPassword />}
                  />
                  <Route path="user/profile" element={<UserProfile />} />
                  <Route path="user/custom-teams" element={<CustomTeams />} />
                  <Route
                    path="user/favorite-teams"
                    element={<FavoriteTeams />}
                  />
                  <Route
                    path="user/email-subscriptions"
                    element={<EmailSubscriptions />}
                  />
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </NflProvider>
        </AuthProvider>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={2}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
