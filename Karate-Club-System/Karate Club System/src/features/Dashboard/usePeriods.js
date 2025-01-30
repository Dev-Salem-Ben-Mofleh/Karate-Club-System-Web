import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getSubscriptionPeriodsAfterDate } from "../../services/apiSubScriptionPeriod";

export function usePeriods() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: periods } = useQuery({
    queryFn: () => getSubscriptionPeriodsAfterDate(queryDate),
    queryKey: ["periods", `last-${numDays}`],
  });

  return { isLoading, periods };
}
