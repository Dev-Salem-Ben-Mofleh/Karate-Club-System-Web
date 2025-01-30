import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchUsers } from "../../services/apiUsers";

export function useSearch() {
  const [searchParams] = useSearchParams();

  //search
  const Culomn = searchParams.get("SearchtBy") || "id";
  const ValueSearch = searchParams.get("search") || "";

  const {
    isLoading,
    data: user = {},
    error,
  } = useQuery({
    queryKey: ["users", Culomn, ValueSearch],
    queryFn: () => searchUsers(Culomn, ValueSearch),
    enabled: !!ValueSearch,
  });

  return { isLoading, error, user };
}
