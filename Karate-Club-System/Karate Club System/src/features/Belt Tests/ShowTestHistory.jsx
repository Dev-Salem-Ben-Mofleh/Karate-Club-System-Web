import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Pagination2 from "../../ui/Pagination2";
import { useAllTestByMemberID } from "./useTestHistory";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import TestRowForMemberHistory from "./TestRowForMemberHistory";
import ButtonCancle from "../../ui/ButtonCancle";

function ShowTestHistory({ memberID, onCloseModal }) {
  const { isLoading, tests = {}, count } = useAllTestByMemberID(memberID);

  if (isLoading) return <Spinner />;
  if (!tests.length) return <Empty resourceName="tests" />;

  return (
    <Menus>
      <Heading as="h2">Belt Test History with ID= {memberID}</Heading>
      <Table columns="55px 105px 135px 170px 70px 82px 1fr ;">
        <Table.Header>
          <div>Test ID</div>
          <div>Member Name</div>
          <div>Instructor Name</div>
          <div>Rank Name</div>
          <div>Date</div>
          <div>Payment ID</div>
          <div>Result</div>
        </Table.Header>
        <Table.Body
          data={tests}
          render={(test) => (
            <TestRowForMemberHistory test={test} key={tests.TestID} />
          )}
        />
        <Table.Footer>
          <Pagination2 count={count} />
        </Table.Footer>
      </Table>
      <ButtonCancle>
        <Button
          variation="danger"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Close
        </Button>
      </ButtonCancle>
    </Menus>
  );
}

export default ShowTestHistory;
