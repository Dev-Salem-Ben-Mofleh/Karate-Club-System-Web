import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addSubscriptionPeriod } from "../../services/apiSubScriptionPeriod";

export function useCreatePeriod() {
  const queryClient = useQueryClient();

  const { mutate: createPeriod, isPending: isCreating } = useMutation({
    mutationFn: async ({ newPeriod, payment }) => {
      if (!newPeriod || !payment) {
        throw new Error("Both newPeriod and payment must be provided.");
      }
      return await addSubscriptionPeriod(newPeriod, payment);
    },
    onSuccess: (periodID) => {
      toast.success(`New Period successfully created with ID = ${periodID}`);
      queryClient.invalidateQueries({ queryKey: ["periods"] });
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    },
  });

  return { isCreating, createPeriod };
}
