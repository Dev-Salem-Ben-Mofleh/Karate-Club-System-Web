import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMemberInstructorByID } from "../../services/apiMemberInstructor";
import toast from "react-hot-toast";

export function useUpdateMemebreIstructor() {
  const queryClient = useQueryClient();

  const { mutate: updateMemberInstructor, isPending: isUpdating } = useMutation(
    {
      mutationFn: async ({ updateMemberInstructor }) => {
        if (!updateMemberInstructor) {
          throw new Error(
            "All fields (updateMemberInstructor) must be provided."
          );
        }
        return await updateMemberInstructorByID(updateMemberInstructor);
      },
      onSuccess: (data) => {
        toast.success(
          `MemberInstructor successfully updated with ID = ${data.memberInstructorID}`
        );
        queryClient.invalidateQueries({ queryKey: ["memberInstructors"] });
      },
      onError: (err) => {
        const errorMessage =
          err?.response?.data?.message || err.message || "An error occurred";
        toast.error(`Update failed: ${errorMessage}`);
      },
    }
  );

  return { isUpdating, updateMemberInstructor };
}
