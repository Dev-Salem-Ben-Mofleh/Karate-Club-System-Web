import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllMemberInstructors } from "../../services/apiMemberInstructor";
import { PAGE_SIZE } from "../../utils/constants";
import { useEffect } from "react";

export function useAllMemberInstructors() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  //PTE-FETCHING

  const { isLoading, data, error } = useQuery({
    queryKey: ["memberInstructors", page, PAGE_SIZE],
    queryFn: () => getAllMemberInstructors(page, PAGE_SIZE),
    keepPreviousData: true,
  });

  const memberInstructors = data?.memberInstructors || [];
  const count = data?.count || 0;

  useEffect(() => {
    if (page < Math.ceil(count / PAGE_SIZE)) {
      queryClient.prefetchQuery({
        queryKey: ["members", page + 1, PAGE_SIZE],
        queryFn: () => getAllMemberInstructors(page + 1, PAGE_SIZE),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["members", page - 1, PAGE_SIZE],
        queryFn: () => getAllMemberInstructors(page - 1, PAGE_SIZE),
      });
    }
  }, [page, count, queryClient]);

  return { isLoading, error, memberInstructors, count };
}

//PAGINATION
