import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { usePeriods } from "./usePeriods";
import { useActivePeriods } from "./useActivePeriods";
import { useAllPeriod } from "../Subscription Period/useAllPeriod";
import PeriodChart from "./PeriodChart";
import { useTests } from "./useTests";
import TestCahrt from "./TestCahrt";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media (max-width: 1130px) {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }
`;

function DashboardLayout() {
  const { periods: period1 = {}, isLoading: isLoading1 } = usePeriods();
  const { tests = {}, isLoading: isLoading2 } = useTests();

  const {
    ActivePeriods = {},
    isLoading: isLoading3,
    numDays,
  } = useActivePeriods();
  const { periods: periods2 = {}, isLoading: isLoading4 } = useAllPeriod();

  if (isLoading1 || isLoading2 || isLoading3 || isLoading4) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        periods={period1}
        ActivePeriods={ActivePeriods}
        numDays={numDays}
        periodsCount={periods2.length}
      />
      <PeriodChart confirmedActivePeriods={ActivePeriods} />
      <TestCahrt confirmedTests={tests} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
