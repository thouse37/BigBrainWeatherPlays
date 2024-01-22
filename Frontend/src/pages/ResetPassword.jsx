import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../ui/Container.jsx";
import Button from "../ui/Button.jsx";
import EyeOffSVG from "../ui/EyeOffSVG.jsx";
import EyeShowSVG from "../ui/EyeShowSVG.jsx";
import { resetPasswordApi } from "../services/apiPassword.js";
import { toast } from "react-toastify";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%&^()#])[A-Za-z\d@$!%&^()#]{8,}$/;

  const onSubmit = async (data) => {
    try {
      await resetPasswordApi({ token, password: data.password });
      toast.success("Password reset successfully!", { autoClose: 1500 });
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to reset password");
    }
  };

  return (
    <Container>
      <h1 className="text-4xl font-bold text-center my-12">
        Reset Your Password
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-blue-950 p-8 rounded-lg shadow-md max-w-md mx-auto"
      >
        <div className="mb-6">
          <label
            className="block text-blue-300 text-md font-medium mb-2"
            htmlFor="password"
          >
            New Password
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
        <div className="flex justify-center">
          <Button type="primary" submit={true}>
            Reset Password
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default ResetPassword;
