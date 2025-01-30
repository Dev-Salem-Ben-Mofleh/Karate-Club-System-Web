import { useQuery } from "@tanstack/react-query";
import { searchMembers } from "../../services/apiMembers";
import { useSearchParams } from "react-router-dom";

export function useSearch() {
  const [searchParams] = useSearchParams();

  //search
  const Culomn = searchParams.get("SearchtBy") || "id";
  const ValueSearch = searchParams.get("search") || "";

  const {
    isLoading,
    data: member = {},
    error,
  } = useQuery({
    queryKey: ["members", Culomn, ValueSearch],
    queryFn: () => searchMembers(Culomn, ValueSearch),
    enabled: !!ValueSearch,
  });

  return { isLoading, error, member };
}
