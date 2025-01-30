import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPeriodMemberByID } from "../../services/apiSubScriptionPeriod";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_FOR_HISTORY } from "../../utils/constants";

export function usePeriodByMemberID(MemberID) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page2")
    ? 1
    : Number(searchParams.get("page2"));

  const {
    isLoading,
    data: { period, count } = {},
    error,
  } = useQuery({
    queryKey: ["memberPeriod", MemberID, page, PAGE_SIZE_FOR_HISTORY],
    queryFn: () => getPeriodMemberByID(MemberID, page, PAGE_SIZE_FOR_HISTORY),
    retry: 2,
  });

  const pageCount = Math.ceil(count / PAGE_SIZE_FOR_HISTORY);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["memberPeriod", page + 1, PAGE_SIZE_FOR_HISTORY],
      queryFn: () => getPeriodMemberByID(MemberID, page, PAGE_SIZE_FOR_HISTORY),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["memberPeriod", page - 1, PAGE_SIZE_FOR_HISTORY],
      queryFn: () => getPeriodMemberByID(MemberID, page, PAGE_SIZE_FOR_HISTORY),
    });

  return { isLoading, error, period, count };
}
