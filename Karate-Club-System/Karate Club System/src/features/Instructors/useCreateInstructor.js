import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addInstructor } from "../../services/apiInstructors";

export function useCreateInstructor() {
  const queryClient = useQueryClient();

  const { mutate: createInstructor, isPending: isCreating } = useMutation({
    mutationFn: async ({ newInstructor, newPerson }) => {
      if (!newInstructor || !newPerson) {
        throw new Error("Both newInstructor and newPerson must be provided.");
      }
      return await addInstructor(newInstructor, newPerson);
    },
    onSuccess: (instructorID) => {
      toast.success(
        `New Instructor successfully created with ID = ${instructorID}`
      );
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    },
  });

  return { isCreating, createInstructor };
}
