import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getCountBeltTestsAfterDate } from "../../services/apiBeltTests";

export function useTests() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: tests } = useQuery({
    queryFn: () => getCountBeltTestsAfterDate(queryDate),
    queryKey: ["resultTests", `last-${numDays}`],
  });

  return { isLoading, tests };
}
