import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPaymentsByMemberID } from "../../services/apiPayments";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_FOR_HISTORY } from "../../utils/constants";

export function usePaymentByMemberID(MemberID) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const {
    isLoading,
    data: { payments, count } = {},
    error,
  } = useQuery({
    queryKey: ["memberPayment", MemberID, page, PAGE_SIZE_FOR_HISTORY],
    queryFn: () => getPaymentsByMemberID(MemberID, page, PAGE_SIZE_FOR_HISTORY),
    retry: true,
  });

  const pageCount = Math.ceil(count / PAGE_SIZE_FOR_HISTORY);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["memberPayment", MemberID, page + 1, PAGE_SIZE_FOR_HISTORY],
      queryFn: () =>
        getPaymentsByMemberID(MemberID, page, PAGE_SIZE_FOR_HISTORY),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["memberPayment", MemberID, page - 1, PAGE_SIZE_FOR_HISTORY],
      queryFn: () =>
        getPaymentsByMemberID(MemberID, page, PAGE_SIZE_FOR_HISTORY),
    });

  return { isLoading, error, payments, count };
}
