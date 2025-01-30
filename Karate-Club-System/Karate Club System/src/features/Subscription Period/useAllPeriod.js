import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllSubscriptionPeriods } from "../../services/apiSubScriptionPeriod";
import { PAGE_SIZE } from "../../utils/constants";
import { useEffect } from "react";

export function useAllPeriod() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //filter
  const filterValue = searchParams.get("status");
  const filter = filterValue ? filterValue : "all";
  const page = Number(searchParams.get("page")) || 1;

  //PTE-FETCHING

  const { isLoading, data, error } = useQuery({
    queryKey: ["periods", page, PAGE_SIZE, filter],
    queryFn: () => getAllSubscriptionPeriods(page, PAGE_SIZE, filter),
    keepPreviousData: true,
  });

  const periods = data?.periods || [];
  const count = data?.count || 0;

  useEffect(() => {
    if (page < Math.ceil(count / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: ["periods", page + 1, PAGE_SIZE, filter],
        queryFn: () => getAllSubscriptionPeriods(page + 1, PAGE_SIZE, filter),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["periods", page - 1, PAGE_SIZE, filter],
        queryFn: () => getAllSubscriptionPeriods(page - 1, PAGE_SIZE, filter),
      });
    }
  }, [page, filter, count, queryClient]);

  return { isLoading, error, periods, count };
}

//PAGINATION
