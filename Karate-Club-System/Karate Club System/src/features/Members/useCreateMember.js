import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addMember } from "../../services/apiMembers";

export function useCreateMembre() {
  const queryClient = useQueryClient();

  const { mutate: createMember, isPending: isCreating } = useMutation({
    mutationFn: async ({ newMember, newPerson }) => {
      if (!newMember || !newPerson) {
        throw new Error("Both newMember and newPerson must be provided.");
      }
      return await addMember(newMember, newPerson);
    },
    onSuccess: (memberID) => {
      toast.success(`New member successfully created with ID = ${memberID}`);
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    },
  });
  return { isCreating, createMember };
}
