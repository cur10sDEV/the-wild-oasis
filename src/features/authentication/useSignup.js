import { useMutation } from "@tanstack/react-query";
import { signupUser as signupUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignup = () => {
  const { mutate: signupUser, isLoading } = useMutation({
    mutationFn: signupUserApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify your email address."
      );
    },
    onError: () => {
      toast.error("There's an error during account creation");
    },
  });

  return { signupUser, isLoading };
};
