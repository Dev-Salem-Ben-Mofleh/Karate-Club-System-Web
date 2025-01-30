import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import { useAllBeltRanks } from "../BeltRanks/useAllBeltRanks";
import BeltRankRow from "./BeltRankRow";
import { useSearch } from "./useSearch";

function BeltRankTable() {
  const { isLoading, beltRanks = {}, count } = useAllBeltRanks();
  const { isLoading: isLoading2, beltRank } = useSearch();

  const [searchParams] = useSearchParams();

  if (isLoading || isLoading2) return <Spinner />;
  if (!beltRanks.length) return <Empty resourceName="beltRanks" />;

  const filterValue = searchParams.get("search") || "";
  let filteredBeltRanks = beltRanks;

  if (filterValue !== "") {
    if (!beltRank.length) return <Empty resourceName="beltRanks" />;
    filteredBeltRanks = beltRank;
  }
  return (
    <Menus>
      <Table columns=" 1fr 1fr 1fr 1fr;">
        <Table.Header>
          <div>Belt Rank ID</div>
          <div>Rank Name</div>
          <div>Test Fees</div>
        </Table.Header>
        <Table.Body
          data={filteredBeltRanks}
          render={(beltRank) => (
            <BeltRankRow beltRank={beltRank} key={beltRank.rankID} />
          )}
        />
        {!beltRank.length ? (
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        ) : null}
      </Table>
    </Menus>
  );
}

export default BeltRankTable;
