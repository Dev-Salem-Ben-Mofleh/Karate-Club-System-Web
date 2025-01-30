import { useQuery } from "@tanstack/react-query";
import { getAllBeltRanksforShowMembers } from "../../services/apiBeltRanks";

export function useAllBeltRankForMembers() {
  const {
    isLoading,
    data: beltRanks = {},
    error,
  } = useQuery({
    queryKey: ["beltRanks", 1, 17],
    queryFn: () => getAllBeltRanksforShowMembers(1, 17),
  });

  return { isLoading, error, beltRanks };
}
