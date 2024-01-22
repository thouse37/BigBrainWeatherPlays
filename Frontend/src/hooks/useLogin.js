import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiLogin.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext.jsx";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const auth = useAuth();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/", { replace: true });

      auth.login(data.token, data.avatar);

      toast.success("Login Successful!", { autoClose: 1500 });
    },
    onError: (err) => {
      toast.error(err.message || "An error occurred during login");
    },
  });

  return { login, isLoading };
}
