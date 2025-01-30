import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBeltRanks } from "../../services/apiBeltRanks";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { useEffect } from "react";

export function useAllBeltRanks() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data, error } = useQuery({
    queryKey: ["beltRanks", page, PAGE_SIZE],
    queryFn: () => getAllBeltRanks(page, PAGE_SIZE),
    keepPreviousData: true,
  });

  const beltRanks = data?.beltRanks || [];
  const count = data?.count || 0;
  useEffect(() => {
    if (page < Math.ceil(count / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: ["beltRanks", page + 1, PAGE_SIZE],
        queryFn: () => getAllBeltRanks(page + 1, PAGE_SIZE),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["beltRanks", page - 1, PAGE_SIZE],
        queryFn: () => getAllBeltRanks(page - 1, PAGE_SIZE),
      });
    }
  }, [page, count, queryClient]);

  return { isLoading, error, beltRanks, count };
}
