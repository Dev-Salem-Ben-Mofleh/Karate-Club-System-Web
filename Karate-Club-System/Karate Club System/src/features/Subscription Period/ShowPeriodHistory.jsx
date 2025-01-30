import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import { usePeriodByMemberID } from "./usePeriodHistory";
import Empty from "../../ui/Empty";
import PeriodRowForMemberHistory from "./PeriodRowForMemberHistory";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import ButtonCancle from "../../ui/ButtonCancle";
import Pagination2 from "../../ui/Pagination2";

function ShowPeriodHistory({ memberID, onCloseModal }) {
  const { isLoading, period = {}, count } = usePeriodByMemberID(memberID);

  if (isLoading) return <Spinner />;
  if (!period.length) return <Empty resourceName="periods" />;

  return (
    <Menus>
      <Heading as="h2">Subscription period History with ID= {memberID}</Heading>
      <Table columns="71px 90px 50px 50px 85px 70px 140px 84px 68px ;">
        <Table.Header>
          <div>Period ID</div>
          <div>Name</div>
          <div>Fees</div>
          <div>Paid</div>
          <div>Start Date</div>
          <div>End Date</div>
          <div>Subscrpiton Days</div>
          <div>Payment ID</div>
          <div>is Active</div>
        </Table.Header>
        <Table.Body
          data={period}
          render={(period) => (
            <PeriodRowForMemberHistory period={period} key={period.periodID} />
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

export default ShowPeriodHistory;
