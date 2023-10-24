import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser as logoutUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutUser, isLoading } = useMutation({
    mutationKey: ["user"],
    mutationFn: () => logoutUserApi(),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Logout was unsuccessfull");
    },
  });

  return { logoutUser, isLoading };
};
