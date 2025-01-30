import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import { useAllTests } from "./useAllTest";
import TestRow from "./TestRow";
import { useSearch } from "./useSearch";
import { useAllBeltRankForMembers } from "../BeltRanks/useAllBeltRankForMembers";

function TestTable() {
  const { isLoading, tests = {}, count } = useAllTests();
  useAllBeltRankForMembers();

  const { isLoading: isLoading2, test } = useSearch();
  const [searchParams] = useSearchParams();

  if (isLoading || isLoading2) return <Spinner />;
  if (!tests.length) return <Empty resourceName="tests" />;

  const filterValue = searchParams.get("search") || "";
  let filteredtests = tests;

  if (filterValue !== "") {
    if (!test.length) return <Empty resourceName="tests" />;
    filteredtests = test;
  }
  return (
    <Menus>
      <Table columns="1fr 1.5fr 1.5fr 2fr 1fr 1fr 1fr 1fr;">
        <Table.Header>
          <div>Test ID</div>
          <div>Member Name</div>
          <div>Instructor Name</div>
          <div>Rank Name</div>
          <div>Test Date</div>
          <div>Payment ID</div>
          <div>Result</div>
        </Table.Header>
        <Table.Body
          data={filteredtests}
          render={(test) => <TestRow test={test} key={test.testID} />}
        />
        {!test.length ? (
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        ) : null}
      </Table>
    </Menus>
  );
}

export default TestTable;
