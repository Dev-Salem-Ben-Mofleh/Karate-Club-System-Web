import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getActiveSubscriptionPeriodAfterDate } from "../../services/apiSubScriptionPeriod";

export function useActivePeriods() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: ActivePeriods } = useQuery({
    queryFn: () => getActiveSubscriptionPeriodAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  return { isLoading, ActivePeriods, numDays };
}
