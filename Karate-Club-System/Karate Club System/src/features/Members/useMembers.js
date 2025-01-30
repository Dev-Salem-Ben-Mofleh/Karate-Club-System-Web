import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllMembersPerPage } from "../../services/apiMembers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { useEffect } from "react";

export function useMembers() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filter = searchParams.get("status") || "all";
  const page = Number(searchParams.get("page")) || 1;

  const { isLoading, data, error } = useQuery({
    queryKey: ["members", page, PAGE_SIZE, filter],
    queryFn: () => getAllMembersPerPage(page, PAGE_SIZE, filter),
    keepPreviousData: true,
  });

  const members = data?.members || [];
  const count = data?.count || 0;

  useEffect(() => {
    if (page < Math.ceil(count / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: ["members", page + 1, PAGE_SIZE, filter],
        queryFn: () => getAllMembersPerPage(page + 1, PAGE_SIZE, filter),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["members", page - 1, PAGE_SIZE, filter],
        queryFn: () => getAllMembersPerPage(page - 1, PAGE_SIZE, filter),
      });
    }
  }, [page, filter, count, queryClient]);

  return { isLoading, error, members, count };
}
