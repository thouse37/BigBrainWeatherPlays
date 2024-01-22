import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  fetchUserProfileApi,
  updateUsernameApi,
  updateAvatarApi,
  updateEmailApi,
  updatePasswordApi,
} from "../services/apiUserProfile.js";
import Container from "../ui/Container.jsx";
import Button from "../ui/Button.jsx";
import EyeShowSVG from "../ui/EyeShowSVG.jsx";
import EyeOffSVG from "../ui/EyeOffSVG.jsx";
import UserAvatar from "../ui/UserAvatar.jsx";

function UserProfile() {
  const auth = useAuth();

  const [selectedFile, setSelectedFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  // const token = localStorage.getItem("token")

  const {
    data: userProfile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userProfile", auth.token],
    queryFn: () => fetchUserProfileApi(auth.token),
    enabled: !!auth.token,
  });

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const queryClient = useQueryClient(); // This is used to refetch queries

  const handleEmailChange = async (data) => {
    // Updated function name to handleEmailChange
    try {
      if (!data.email) {
        // Updated to use 'email' instead of 'contact'
        toast.error("Email cannot be empty");
        return;
      }
      const response = await updateEmailApi({
        // Updated function name to updateEmailApi
        token: auth.token,
        email: data.email, // Updated to use 'email' instead of 'contact'
      });
      toast.success("Email updated successfully!", { autoClose: 1500 });
      queryClient.invalidateQueries(["userProfile", auth.token]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUsernameChange = async (data) => {
    try {
      if (!data.username) {
        toast.error("Username cannot be empty");
        return;
      }
      const response = await updateUsernameApi({
        token: auth.token,
        username: data.username,
      });
      toast.success("Username updated successfully!"), { autoClose: 1500 };
      queryClient.invalidateQueries(["userProfile", auth.token]); // Refetch user profile
    } catch (error) {
      toast.error(`Error updating username: ${error.message}`);
    }
  };

  const handlePasswordChange = async (data) => {
    try {
      if (!data.password || !data.password_repeat) {
        toast.error("Password cannot be empty");
        return;
      }

      if (data.password === data.password_repeat) {
        const response = await updatePasswordApi({
          token: auth.token,
          password: data.password,
        });
        toast.success("Password updated successfully!", { autoClose: 1500 });
        queryClient.invalidateQueries(["userProfile", auth.token]); // Refetch user profile
      } else {
        toast.error("Passwords do not match!");
      }
    } catch (error) {
      toast.error(`Error updating password: ${error.message}`);
    }
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAvatarChange = async () => {
    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }

    try {
      const response = await updateAvatarApi({
        token: auth.token,
        avatar: selectedFile,
      });

      // Update auth context with the new avatar
      auth.updateAvatar(response.avatar);

      toast.success(response.message, { autoClose: 1500 });

      queryClient.invalidateQueries(["userProfile", auth.token]);
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error(`Error updating avatar: ${error.message}`);
    }
  };

  if (!auth.token) {
    return (
      <Container>
        <div>Please log in to view this page.</div>;
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <div>Error: {error.message}</div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="bg-blue-950 p-8 rounded-lg shadow-md mt-10">
        <h1 className="text-blue-300 font-bold mb-8 text-center">
          Edit Profile
        </h1>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 gap-4 ml-10">
            {/* Email Change Form */}
            <div className="mb-6 p-4 bg-blue-950 rounded-lg">
              <div className="flex flex-col space-y-4">
                <span>Email:</span>
                <span>{userProfile?.email} </span>
                <form
                  onSubmit={handleSubmit(handleEmailChange)} // Updated to use handleEmailChange
                  className="flex flex-col space-y-2"
                >
                  <input
                    name="email" // Updated to use 'email' instead of 'contact'
                    {...register("email", {
                      pattern: {
                        value: /\S+@\S+\.\S+$/, // Updated pattern for email
                        message: "Invalid email format",
                      },
                    })}
                    type="text"
                    placeholder="New Email"
                    className="text-blue-300 bg-blue-950 border border-blue-400 rounded p-2"
                  />
                  <div className="w-32">
                    <Button submit="submit" type="primary">
                      Change
                    </Button>
                  </div>
                  {errors?.email && <p>{errors.email.message}</p>}
                </form>
              </div>
            </div>

            {/* Username Change Form */}
            <div className="mb-6 p-4 bg-blue-950 rounded-lg">
              <div className="flex flex-col space-y-4">
                <span>Username:</span>
                <span>{userProfile?.username}</span>
                <form
                  onSubmit={handleSubmit(handleUsernameChange)}
                  className="flex flex-col space-y-2"
                >
                  <input
                    name="username"
                    {...register("username")}
                    type="text"
                    placeholder="New Username"
                    className="text-blue-300 bg-blue-950 border border-blue-400 rounded p-2"
                  />

                  <div className="w-32">
                    <Button submit="submit" type="primary">
                      Change
                    </Button>
                  </div>
                  {errors?.username && <p>{errors.username.message}</p>}
                </form>
              </div>
            </div>

            {/* Password Change Form */}
            <div className="mb-6 p-4 bg-blue-950 rounded-lg">
              <div className="flex flex-col space-y-4">
                <span>Password:</span>
                <span>********</span>
                <form
                  onSubmit={handleSubmit(handlePasswordChange)}
                  className="flex flex-col space-y-2"
                >
                  <div className="relative">
                    <input
                      name="password"
                      {...register("password", {
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%&^()#])[A-Za-z\d@$!%&^()#]{8,}$/,
                          message:
                            "Password must include at least one uppercase letter, one number, and one special character",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="New Password"
                      className="text-blue-300 bg-blue-950 border border-blue-400 rounded p-2 w-80" // Set width using w-80 class
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                      className="absolute right-3 top-2.5"
                    >
                      {showPassword ? <EyeOffSVG /> : <EyeShowSVG />}
                    </button>
                  </div>
                  {errors?.password && (
                    <div className="whitespace-normal w-80">
                      {errors.password.message}
                    </div>
                  )}
                  <div className="relative">
                    <input
                      name="password_repeat"
                      {...register("password_repeat", {
                        validate: (value) =>
                          value === password.current ||
                          "The passwords do not match",
                      })}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repeat New Password"
                      className="text-blue-300 bg-blue-950 border border-blue-400 rounded p-2 w-80" // Set width using w-80 class
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      } // Toggle password visibility
                      className="absolute right-3 top-2.5"
                    >
                      {showConfirmPassword ? <EyeOffSVG /> : <EyeShowSVG />}
                    </button>
                  </div>
                  {errors?.password_repeat && (
                    <div className="whitespace-normal w-80">
                      {errors.password_repeat.message}
                    </div>
                  )}
                  <div className="w-32">
                    <Button submit="submit" type="primary">
                      Change
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Avatar Change Form */}
            <div className="mb-6 p-4 bg-blue-950 rounded-lg">
              <div className="flex flex-col space-y-4">
                <span>Avatar:</span>
                <UserAvatar avatar={userProfile?.avatar} height="h-16" />
                <form
                  onSubmit={handleSubmit(handleAvatarChange)}
                  className="flex flex-col space-y-2"
                >
                  <input
                    name="avatar"
                    type="file"
                    onChange={handleAvatarUpload}
                    className="text-blue-300 bg-blue-950 border border-blue-400 rounded p-2" // Added padding 'p-2'
                  />

                  <div className="w-32">
                    <Button submit="submit" type="primary">
                      Change
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default UserProfile;
