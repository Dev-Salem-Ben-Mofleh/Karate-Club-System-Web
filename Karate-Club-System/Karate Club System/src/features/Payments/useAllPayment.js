import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPayments } from "../../services/apiPayments";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { useEffect } from "react";

export function useAllPayments() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { isLoading, data, error } = useQuery({
    queryKey: ["payments", page, PAGE_SIZE],
    queryFn: () => getAllPayments(page, PAGE_SIZE),
    keepPreviousData: true,
  });

  const payments = data?.payments || [];
  const count = data?.count || 0;

  useEffect(() => {
    if (page < Math.ceil(count / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: ["payments", page + 1, PAGE_SIZE],
        queryFn: () => getAllPayments(page + 1, PAGE_SIZE),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["payments", page - 1, PAGE_SIZE],
        queryFn: () => getAllPayments(page - 1, PAGE_SIZE),
      });
    }
  }, [page, count, queryClient]);

  return { isLoading, error, payments, count };
}
