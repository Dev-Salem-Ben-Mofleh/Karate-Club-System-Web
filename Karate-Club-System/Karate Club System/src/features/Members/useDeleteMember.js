import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteMemberByID } from "../../services/apiMembers";

export function useDeleteMember() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteMember } = useMutation({
    mutationFn: async (MemberID) => {
      if (!MemberID) {
        throw new Error("Member ID must be provided for deletion.");
      }
      return await deleteMemberByID(MemberID);
    },
    onSuccess: () => {
      toast.success("Member successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["members"],
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

  return { isDeleting, deleteMember };
}
