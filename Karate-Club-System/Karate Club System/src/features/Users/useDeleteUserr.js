import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUserByID } from "../../services/apiUsers";

export function useDeleteUserr() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: async (UserID) => {
      if (!UserID) {
        throw new Error("UserID ID must be provided for deletion.");
      }
      return await deleteUserByID(UserID);
    },
    onSuccess: () => {
      toast.success("user successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message ||
        err.message ||
        "An error occurred while deleting the member.";
      toast.error(`Deletion failed: ${errorMessage}`);
    },
  });

  return { isDeleting, deleteUser };
}
