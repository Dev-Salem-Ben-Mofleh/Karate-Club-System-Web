import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllTests } from "../../services/apiBeltTests";
import { PAGE_SIZE } from "../../utils/constants";
import { useEffect } from "react";

export function useAllTests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  //PTE-FETCHING

  const { isLoading, data, error } = useQuery({
    queryKey: ["tests", page, PAGE_SIZE],
    queryFn: () => getAllTests(page, PAGE_SIZE),
    keepPreviousData: true,
  });

  const tests = data?.tests || [];
  const count = data?.count || 0;

  useEffect(() => {
    if (page < Math.ceil(count / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: ["members", page + 1, PAGE_SIZE],
        queryFn: () => getAllTests(page + 1, PAGE_SIZE),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["members", page - 1, PAGE_SIZE],
        queryFn: () => getAllTests(page - 1, PAGE_SIZE),
      });
    }
  }, [page, count, queryClient]);

  return { isLoading, error, tests, count };
}

//PAGINATION
