import { useForm } from "react-hook-form";
import Container from "../ui/Container.jsx";
import Button from "../ui/Button.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../services/apiPassword.js";

function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await forgotPasswordApi(data.email);
      toast.success(response.message || "Reset link sent successfully!", {
        autoClose: 1500,
      });
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message || "Failed to send reset link");
    }
  };

  return (
    <Container>
      <h1 className="text-4xl font-bold text-center my-12">
        Request New Password
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-blue-950 p-8 rounded-lg shadow-md max-w-md mx-auto"
      >
        <div className="mb-6">
          <label
            className="block text-blue-300 text-md font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className="bg-blue-950 text-blue-300 border border-blue-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-300"
          />
        </div>
        <div className="flex justify-center">
          <Button submit="submit" type="primary">
            Reset Password
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default ForgotPassword;
