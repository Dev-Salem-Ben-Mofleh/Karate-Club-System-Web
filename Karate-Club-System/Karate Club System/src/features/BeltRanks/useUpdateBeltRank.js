import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBeltRankByID } from "../../services/apiBeltRanks";
import toast from "react-hot-toast";

export function useUpdateBeltRank() {
  const queryClient = useQueryClient();

  const { mutate: updatBeltRank, isPending: isUpdating } = useMutation({
    mutationFn: async ({ updateBeltRank }) => {
      if (!updateBeltRank) {
        throw new Error("All fields ( updatBeltRank) must be provided.");
      }
      return await updateBeltRankByID(updateBeltRank);
    },
    onSuccess: (data) => {
      toast.success(`BeltRank successfully updated with ID = ${data.rankID}`);
      queryClient.invalidateQueries({ queryKey: ["beltRanks"] });
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message || err.message || "An error occurred";
      toast.error(`Update failed: ${errorMessage}`);
    },
  });

  return { isUpdating, updatBeltRank };
}
