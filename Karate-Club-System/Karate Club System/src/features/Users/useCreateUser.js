import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addUser } from "../../services/apiUsers";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: async ({ newUser, newPerson }) => {
      if (!newUser || !newPerson) {
        throw new Error("Both newUser and newPerson must be provided.");
      }
      return await addUser(newUser, newPerson);
    },
    onSuccess: (UserID) => {
      toast.success(`New user successfully created with ID = ${UserID}`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    },
  });

  return { isCreating, createUser };
}
