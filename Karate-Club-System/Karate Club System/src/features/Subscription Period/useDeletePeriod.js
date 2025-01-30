import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteSubscriptionPeriodsByID } from "../../services/apiSubScriptionPeriod";

export function useDeletePeriod() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deletePeriod } = useMutation({
    mutationFn: async (PeriodID) => {
      if (!PeriodID) {
        throw new Error("Period ID must be provided for deletion.");
      }
      return await deleteSubscriptionPeriodsByID(PeriodID);
    },
    onSuccess: () => {
      toast.success("Subscription successfully deleted.");
      queryClient.invalidateQueries({
        queryKey: ["periods"],
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

  return { isDeleting, deletePeriod };
}
