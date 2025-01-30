import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserByID } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: async ({ UserID, oldImageUrl, updateUser, updatePerson }) => {
      if (!UserID || !updateUser || !updatePerson) {
        throw new Error(
          "All fields (UserID,oldImageUrl, updateUser, updatedPerson) must be provided."
        );
      }
      return await updateUserByID(
        updateUser,
        UserID,
        oldImageUrl,
        updatePerson
      );
    },
    onSuccess: (data) => {
      toast.success(`User successfully updated with ID = ${data.userID}`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message || err.message || "An error occurred";
      toast.error(`Update failed: ${errorMessage}`);
    },
  });

  return { isUpdating, updateUser };
}
