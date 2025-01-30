import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubscriptionPeriodsByID } from "../../services/apiSubScriptionPeriod";
import toast from "react-hot-toast";

export function useUpdatePeriod() {
  const queryClient = useQueryClient();

  const { mutate: updatPeriod, isPending: isUpdating } = useMutation({
    mutationFn: async ({ updatePeriod, payment }) => {
      if (!updatePeriod || !payment) {
        throw new Error("All fields (updatePeriod, payment) must be provided.");
      }
      return await updateSubscriptionPeriodsByID(updatePeriod, payment);
    },
    onSuccess: (data) => {
      toast.success(`period successfully updated with ID = ${data.periodID}`);
      queryClient.invalidateQueries({ queryKey: ["periods"] });
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message || err.message || "An error occurred";
      toast.error(`Update failed: ${errorMessage}`);
    },
  });

  return { isUpdating, updatPeriod };
}
