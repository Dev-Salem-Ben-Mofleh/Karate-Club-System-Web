import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMemberByID } from "../../services/apiMembers";
import toast from "react-hot-toast";

export function useUpdateMember() {
  const queryClient = useQueryClient();

  const { mutate: updatMember, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      MemberID,
      oldImageUrl,
      updatMember,
      updatePerson,
    }) => {
      if (!MemberID || !oldImageUrl || !updatMember || !updatePerson) {
        throw new Error(
          "All fields (memberID,oldImageUrl, updatedMember, updatedPerson) must be provided."
        );
      }
      return await updateMemberByID(
        updatMember,
        MemberID,
        oldImageUrl,
        updatePerson
      );
    },
    onSuccess: (data) => {
      toast.success(`Member successfully updated with ID = ${data.memberID}`);
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message || err.message || "An error occurred";
      toast.error(`Update failed: ${errorMessage}`);
    },
  });

  return { isUpdating, updatMember };
}
