import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteInstructorByID } from "../../services/apiInstructors";

export function useDeleteInstuctor() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteInstructor } = useMutation({
    mutationFn: async (InstructorID) => {
      if (!InstructorID) {
        throw new Error("Instructor ID must be provided for deletion.");
      }
      return await deleteInstructorByID(InstructorID);
    },
    onSuccess: () => {
      toast.success("Instructor successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["instructors"],
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

  return { isDeleting, deleteInstructor };
}
