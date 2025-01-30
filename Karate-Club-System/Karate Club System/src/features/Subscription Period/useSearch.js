import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchSubscriptionPeriods } from "../../services/apiSubScriptionPeriod";

export function useSearch() {
  const [searchParams] = useSearchParams();

  //search
  const Culomn = searchParams.get("SearchtBy") || "id";
  const ValueSearch = searchParams.get("search") || "";

  const {
    isLoading,
    data: period = {},
    error,
  } = useQuery({
    queryKey: ["periods", Culomn, ValueSearch],
    queryFn: () => searchSubscriptionPeriods(Culomn, ValueSearch),
    enabled: !!ValueSearch,
  });

  return { isLoading, error, period };
}
