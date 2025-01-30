import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInstructorByID } from "../../services/apiInstructors";
import toast from "react-hot-toast";

export function useUpdateInstructor() {
  const queryClient = useQueryClient();

  const { mutate: updateInstructor, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      InstructorID,
      oldImageUrl,
      updateInstructor,
      updatePerson,
    }) => {
      if (!InstructorID || !oldImageUrl || !updateInstructor || !updatePerson) {
        throw new Error(
          "All fields (InstructorID, updateInstructor, updatedPerson) must be provided."
        );
      }
      return await updateInstructorByID(
        updateInstructor,
        InstructorID,
        oldImageUrl,
        updatePerson
      );
    },
    onSuccess: (data) => {
      toast.success(
        `Instructor successfully updated with ID = ${data.instructorID}`
      );
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message || err.message || "An error occurred";
      toast.error(`Update failed: ${errorMessage}`);
    },
  });

  return { isUpdating, updateInstructor };
}
