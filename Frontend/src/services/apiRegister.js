import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      navigate("/login");

      toast.success("Registration Successful!", { autoClose: 1500 });

      setIsLoading(false);
    } catch (error) {
      //   console.error("Registration error:", error);
      toast.error(error.message || "An error occurred during registration");
      setIsLoading(false);
      throw error;
    }
  };

  return {
    register,
    isLoading,
  };
}
