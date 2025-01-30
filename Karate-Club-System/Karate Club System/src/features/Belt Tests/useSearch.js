import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchBeltTests } from "../../services/apiBeltTests";

export function useSearch() {
  const [searchParams] = useSearchParams();

  //search
  const Culomn = searchParams.get("SearchtBy") || "id";
  const ValueSearch = searchParams.get("search") || "";

  const {
    isLoading,
    data: test = {},
    error,
  } = useQuery({
    queryKey: ["tests", Culomn, ValueSearch],
    queryFn: () => searchBeltTests(Culomn, ValueSearch),
    enabled: !!ValueSearch,
  });

  return { isLoading, error, test };
}
