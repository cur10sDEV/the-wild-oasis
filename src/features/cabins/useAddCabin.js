import toast from "react-hot-toast";
import { addEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: addCabin } = useMutation({
    mutationFn: addEditCabin,
    onSuccess: () => {
      toast.success("Cabin added successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, addCabin };
};
