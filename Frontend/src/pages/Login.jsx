import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin.js";
import Loader from "../ui/Loader.jsx";
import Container from "../ui/Container.jsx";
import Button from "../ui/Button.jsx";
import EyeOffSVG from "../ui/EyeOffSVG.jsx";
import EyeShowSVG from "../ui/EyeShowSVG.jsx";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, isLoading } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = ({ email, password }) => {
    const loginData = {
      loginMethod: "email",
      email,
      password,
    };
    login(loginData);
  };
  const handleGoogleLogin = async (googleData) => {
    const loginData = {
      loginMethod: "google",
      ...googleData,
    };

    login(loginData);
  };
  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-blue-950 p-8 rounded-lg shadow-md max-w-md mx-auto sm:mt-32"
      >
        <h1 className="text-blue-300 font-bold text-xl mb-8 text-center">
          Log in to your account
        </h1>
        <div className="mb-6">
          <label
            className="block text-blue-300 text-md font-medium mb-2"
            htmlFor="contact"
          >
            Email
          </label>
          <input
            id="email"
            {...register("email", { required: "This field is required" })}
            type="email"
            className="bg-blue-950 text-blue-300 border border-blue-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-300"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-400 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-blue-300 text-md font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              {...register("password", { required: "This field is required" })}
              type={showPassword ? "text" : "password"}
              className="bg-blue-950 text-blue-300 border border-blue-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              className="absolute right-3 top-2.5"
            >
              {showPassword ? <EyeOffSVG /> : <EyeShowSVG />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs italic">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex space-x-32">
          <Link
            to="/forgot-password"
            className="text-sm font-robotoMono text-blue-400"
          >
            Forgot Password?
          </Link>

          <Link
            to="/register"
            className="text-sm font-robotoMono text-blue-400"
          >
            Register Now
          </Link>
        </div>

        <div className="flex justify-center my-10">
          <Button type="primary" disabled={isLoading} submit={true}>
            {isLoading ? <Loader /> : "Login"}
          </Button>
        </div>

        <div className="flex justify-center">
          <p>Or</p>
        </div>
        <div className="flex justify-center my-10">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </form>
    </Container>
  );
}

export default Login;
