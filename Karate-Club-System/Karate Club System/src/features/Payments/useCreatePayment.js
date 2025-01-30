import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addPayment } from "../../services/apiPayments";

export function useCreatePayment() {
  const queryClient = useQueryClient();
  let paymentID = 0;

  const { mutate: createPayment, isPending: isCreating } = useMutation({
    mutationFn: ({ newPayment }) => addPayment(newPayment),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      paymentID = data;
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createPayment, paymentID };
}
