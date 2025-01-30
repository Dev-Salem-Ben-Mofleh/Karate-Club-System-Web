import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTestByMemberID } from "../../services/apiBeltTests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_FOR_HISTORY } from "../../utils/constants";

export function useAllTestByMemberID(MemberID) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page2")
    ? 1
    : Number(searchParams.get("page2"));

  const {
    isLoading,
    data: { tests, count } = {},
    error,
  } = useQuery({
    queryKey: ["memberTest", MemberID, page, PAGE_SIZE_FOR_HISTORY],
    queryFn: () => getAllTestByMemberID(MemberID, page, PAGE_SIZE_FOR_HISTORY),
    retry: 2,
  });

  const pageCount = Math.ceil(count / PAGE_SIZE_FOR_HISTORY);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["memberTest", page + 1, PAGE_SIZE_FOR_HISTORY],
      queryFn: () =>
        getAllTestByMemberID(MemberID, page, PAGE_SIZE_FOR_HISTORY),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["memberTest", page - 1, PAGE_SIZE_FOR_HISTORY],
      queryFn: () =>
        getAllTestByMemberID(MemberID, page, PAGE_SIZE_FOR_HISTORY),
    });
  return { isLoading, error, tests, count };
}
