import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { usePaymentByMemberID } from "./usePaymentHistory";
import PaymentRowForMemberHistory from "./PaymentRowForMemberHistory";
import ButtonCancle from "../../ui/ButtonCancle";
import Pagination2 from "../../ui/Pagination2";

function ShowPaymentHistory({ memberID, onCloseModal }) {
  const { isLoading, payments = {}, count } = usePaymentByMemberID(memberID);

  if (isLoading) return <Spinner />;
  if (!payments.length) return <Empty resourceName="payments" />;

  return (
    <Menus>
      <Heading as="h2">Payment History with ID= {memberID}</Heading>
      <Table columns="1fr 1fr 1fr 1fr;">
        <Table.Header>
          <div>Payment ID</div>
          <div>Member Name</div>
          <div>Payemnt Date</div>
          <div>Payemnt Amount</div>
        </Table.Header>
        <Table.Body
          data={payments}
          render={(payment) => (
            <PaymentRowForMemberHistory
              payment={payment}
              key={payments.PaymentID}
            />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination2 count={count} />
      </Table.Footer>
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

export default ShowPaymentHistory;
