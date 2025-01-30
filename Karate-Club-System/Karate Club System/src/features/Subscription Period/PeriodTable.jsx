import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import { useAllPeriod } from "./useAllPeriod";
import PeriodRow from "./PeriodRow";
import { useSearch } from "./useSearch";
import { useAllBeltRankForMembers } from "../BeltRanks/useAllBeltRankForMembers";

function PeriodTable() {
  const { isLoading, periods = {}, count } = useAllPeriod();
  const { isLoading: isLoading2, period } = useSearch();
  const [searchParams] = useSearchParams();
  useAllBeltRankForMembers();

  if (isLoading || isLoading2) return <Spinner />;
  if (!periods.length) return <Empty resourceName="periods" />;

  const filterValue = searchParams.get("search") || "";
  let filteredPeriods = periods;

  if (filterValue !== "") {
    if (!period.length) return <Empty resourceName="periods" />;
    filteredPeriods = period;
  }

  return (
    <Menus>
      <Table columns="1fr 2fr 1fr 1fr 1.2fr 1fr 2.1fr 1.1fr 1fr 0.3fr;">
        <Table.Header>
          <div>Period ID</div>
          <div>Member Name</div>
          <div>Fees</div>
          <div>Is Paid</div>
          <div>Start Date</div>
          <div>End Date</div>
          <div>Susbscription Days</div>
          <div>Payment ID</div>
          <div>Is Active</div>
        </Table.Header>
        <Table.Body
          data={filteredPeriods}
          render={(period) => (
            <PeriodRow period={period} key={period.memberID} />
          )}
        />
        {!period.length ? (
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        ) : null}
      </Table>
    </Menus>
  );
}

export default PeriodTable;
