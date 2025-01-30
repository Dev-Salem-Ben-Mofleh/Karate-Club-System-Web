import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addBeltTest } from "../../services/apiBeltTests";

export function useCreateTest() {
  const queryClient = useQueryClient();
  const { mutate: createTest, isLoading: isCreating } = useMutation({
    mutationFn: async ({ newBeltTest, payment }) => {
      if (!newBeltTest || !payment) {
        throw new Error("Both newBeltTest and payment must be provided.");
      }
      return await addBeltTest(newBeltTest, payment);
    },
    onSuccess: (testID) => {
      toast.success(`New test successfully created with ID = ${testID}`);
      queryClient.invalidateQueries({ queryKey: ["tests"] });
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    },
  });

  return { isCreating, createTest };
}
