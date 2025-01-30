import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchPayments } from "../../services/apiPayments";

export function useSearch() {
  const [searchParams] = useSearchParams();

  //search
  const Culomn = searchParams.get("SearchtBy") || "id";
  const ValueSearch = searchParams.get("search") || "";

  const {
    isLoading,
    data: payment = {},
    error,
  } = useQuery({
    queryKey: ["payments", Culomn, ValueSearch],
    queryFn: () => searchPayments(Culomn, ValueSearch),
    enabled: !!ValueSearch,
  });

  return { isLoading, error, payment };
}
