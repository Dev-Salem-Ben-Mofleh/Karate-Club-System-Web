import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchBeltRanks } from "../../services/apiBeltRanks";

export function useSearch() {
  const [searchParams] = useSearchParams();

  //search
  const Culomn = searchParams.get("SearchtBy") || "id";
  const ValueSearch = searchParams.get("search") || "";

  const {
    isLoading,
    data: beltRank = {},
    error,
  } = useQuery({
    queryKey: ["beltRanks", Culomn, ValueSearch],
    queryFn: () => searchBeltRanks(Culomn, ValueSearch),
    enabled: !!ValueSearch,
  });

  return { isLoading, error, beltRank };
}
