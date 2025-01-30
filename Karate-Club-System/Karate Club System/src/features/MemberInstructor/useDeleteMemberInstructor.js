import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteMemberInstructorByID } from "../../services/apiMemberInstructor";

export function useDeleteMemberInstuctor() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteMemberInstructor } = useMutation(
    {
      mutationFn: async (memberInstructorID) => {
        if (!memberInstructorID) {
          throw new Error("memberInstructor ID must be provided for deletion.");
        }
        return await deleteMemberInstructorByID(memberInstructorID);
      },
      onSuccess: () => {
        toast.success("memberInstructor successfully deleted.");
        queryClient.invalidateQueries({
          queryKey: ["memberInstructors"],
        });
      },
      onError: (err) => {
        const errorMessage =
          err?.response?.data?.message ||
          err.message ||
          "An error occurred while deleting the member.";
        toast.error(`Deletion failed: ${errorMessage}`);
      },
    }
  );

  return { isDeleting, deleteMemberInstructor };
}
