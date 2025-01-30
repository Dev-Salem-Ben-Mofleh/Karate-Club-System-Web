import { useQuery } from "@tanstack/react-query";
import { getPeriodDay } from "../../services/apiSetting";

export function useGetPeriodDay() {
  const {
    isLoading,
    data: periodDays = 0,
    error,
  } = useQuery({
    queryKey: ["periodDays"],
    queryFn: getPeriodDay,
  });

  return { isLoading, error, periodDays };
}
