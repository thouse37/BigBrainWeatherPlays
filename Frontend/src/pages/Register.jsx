import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "../services/apiRegister.js";
import Loader from "../ui/Loader.jsx";
import Container from "../ui/Container.jsx";
import Button from "../ui/Button.jsx";
import EyeOffSVG from "../ui/EyeOffSVG.jsx";
import EyeShowSVG from "../ui/EyeShowSVG.jsx";
import { GoogleLogin } from "@react-oauth/google";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { register: doRegister, isLoading } = useRegister();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    const registrationData = {
      registrationMethod: "email",
      ...data,
    };
    await doRegister(registrationData);
  };

  const handleGoogleRegistration = async (googleData) => {
    const registrationData = {
      registrationMethod: "google",
      ...googleData,
    };

    await doRegister(registrationData);
  };

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%&^()#])[A-Za-z\d@$!%&^()#]{8,}$/;

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-blue-950 p-8 rounded-lg shadow-md max-w-md mx-auto sm:mt-32"
      >
        <h1 className="text-blue-300 font-bold text-xl mb-8 text-center">
          Register for an account
        </h1>
        <div className="mb-6">
          <label
            className="block text-blue-300 text-md font-medium mb-2"
            htmlFor="contact"
          >
            Email
          </label>
          <input
            id="contact"
            {...register("contact", {
              required: "This field is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email format",
              },
            })}
            type="email"
            className="bg-blue-950 text-blue-300 border border-blue-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-300"
            disabled={isLoading}
          />
          {errors.contact && (
            <p className="text-red-400 text-xs italic">
              {errors.contact.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-blue-300 text-md font-medium mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            {...register("username", {
              required: "You must specify a username",
            })}
            type="text"
            className="bg-blue-950 text-blue-300 border border-blue-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-300"
            disabled={isLoading}
          />
          {errors.username && (
            <p className="text-red-400 text-xs italic">
              {errors.username.message}
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
              {...register("password", {
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
                pattern: {
                  value: passwordPattern,
                  message:
                    "Password must include at least one uppercase letter, one number, and one special character",
                },
              })}
              type={showPassword ? "text" : "password"} // Toggle password visibility
              className="bg-blue-950 text-blue-300 border border-blue-400 rounded w-full py-2 px-3 pr-10 leading-tight focus:outline-none focus:border-blue-300"
              disabled={isLoading}
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
        <div className="mb-6">
          <label
            className="block text-blue-300 text-md font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "You must confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"} // Toggle password visibility
              className="bg-blue-950 text-blue-300 border border-blue-400 rounded w-full py-2 px-3 pr-10 leading-tight focus:outline-none focus:border-blue-300"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle password visibility
              className="absolute right-3 top-2.5"
            >
              {showConfirmPassword ? <EyeOffSVG /> : <EyeShowSVG />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs italic">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex justify-center my-10">
          <Button submit={true} type="primary" disabled={isLoading}>
            {isLoading ? <Loader /> : "Register"}
          </Button>
        </div>

        <div className="flex justify-center">
          <p>Or</p>
        </div>
        <div className="flex justify-center my-10">
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleGoogleRegistration(credentialResponse)
            }
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </div>
      </form>
    </Container>
  );
}

export default Register;
