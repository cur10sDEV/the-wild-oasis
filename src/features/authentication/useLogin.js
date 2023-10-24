import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser as loginUserApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginUser, isLoading: isLogginIn } = useMutation({
    mutationKey: ["user"],
    mutationFn: ({ email, password }) => loginUserApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], () => data.user);
      toast.success("Login successfull");
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { loginUser, isLogginIn };
};
