import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchMemberInstructors } from "../../services/apiMemberInstructor";

export function useSearch() {
  const [searchParams] = useSearchParams();

  //search
  const Culomn = searchParams.get("SearchtBy") || "id";
  const ValueSearch = searchParams.get("search") || "";

  const {
    isLoading,
    data: memberInstructor = {},
    error,
  } = useQuery({
    queryKey: ["memberInstructors", Culomn, ValueSearch],
    queryFn: () => searchMemberInstructors(Culomn, ValueSearch),
    enabled: !!ValueSearch,
  });

  return { isLoading, error, memberInstructor };
}
