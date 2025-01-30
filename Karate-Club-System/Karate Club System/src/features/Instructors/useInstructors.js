import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllInstructors } from "../../services/apiInstructors";
import { PAGE_SIZE } from "../../utils/constants";
import { useEffect } from "react";

export function useInstructors() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //PTE-FETCHING

  const { isLoading, data, error } = useQuery({
    queryKey: ["instructors", page, PAGE_SIZE],
    queryFn: () => getAllInstructors(page, PAGE_SIZE),
    keepPreviousData: true,
  });

  const instructors = data?.instructors || [];
  const count = data?.count || 0;

  useEffect(() => {
    if (page < Math.ceil(count / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: ["instructors", page + 1, PAGE_SIZE],
        queryFn: () => getAllInstructors(page + 1, PAGE_SIZE),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["instructors", page - 1, PAGE_SIZE],
        queryFn: () => getAllInstructors(page - 1, PAGE_SIZE),
      });
    }
  }, [page, count, queryClient]);

  return { isLoading, error, instructors, count };
}
