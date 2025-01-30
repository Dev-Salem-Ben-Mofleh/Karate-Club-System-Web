import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addMemberInstructor } from "../../services/apiMemberInstructor";

export function useCreateMemebreIstructor() {
  const queryClient = useQueryClient();

  const { mutate: createMemberInstructor, isPending: isCreating } = useMutation(
    {
      mutationFn: async ({ newMemberInstructor }) => {
        if (!newMemberInstructor) {
          throw new Error("Both newMemberInstructor  must be provided.");
        }
        return await addMemberInstructor(newMemberInstructor);
      },
      onSuccess: (memberInstructorID) => {
        toast.success(
          `New memberInstructor successfully created with ID = ${memberInstructorID}`
        );
        queryClient.invalidateQueries({ queryKey: ["memberInstructors"] });
      },
      onError: (err) => {
        const errorMessage =
          err?.response?.data?.message || err.message || "An error occurred";
        toast.error(errorMessage);
      },
    }
  );

  return { isCreating, createMemberInstructor };
}
