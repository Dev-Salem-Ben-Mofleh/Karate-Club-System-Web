import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllUsers } from "../../services/apiUsers";
import { PAGE_SIZE } from "../../utils/constants";
import { useEffect } from "react";

export function useUsers() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //filter
  const filterValue = searchParams.get("status");
  const filter = filterValue ? filterValue : "all";
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //PTE-FETCHING

  const { isLoading, data, error } = useQuery({
    queryKey: ["users", page, PAGE_SIZE, filter],
    queryFn: () => getAllUsers(page, PAGE_SIZE, filter),
    keepPreviousData: true,
  });

  const users = data?.users || [];
  const count = data?.count || 0;

  useEffect(() => {
    if (page < Math.ceil(count / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: ["users", page + 1, PAGE_SIZE, filter],
        queryFn: () => getAllUsers(page + 1, PAGE_SIZE, filter),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["users", page - 1, PAGE_SIZE, filter],
        queryFn: () => getAllUsers(page - 1, PAGE_SIZE, filter),
      });
    }
  }, [page, filter, count, queryClient]);

  return { isLoading, error, users, count };
}

//PAGINATION
