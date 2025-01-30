import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchInstructors } from "../../services/apiInstructors";

export function useSearch() {
  const [searchParams] = useSearchParams();

  //search
  const Culomn = searchParams.get("SearchtBy") || "id";
  const ValueSearch = searchParams.get("search") || "";

  const {
    isLoading,
    data: instructor = {},
    error,
  } = useQuery({
    queryKey: ["instructors", Culomn, ValueSearch],
    queryFn: () => searchInstructors(Culomn, ValueSearch),
    enabled: !!ValueSearch,
  });

  return { isLoading, error, instructor };
}
