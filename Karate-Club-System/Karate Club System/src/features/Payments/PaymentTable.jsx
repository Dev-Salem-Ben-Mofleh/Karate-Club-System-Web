import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import { useAllPayments } from "./useAllPayment";
import PaymentRow from "./PaymentRow";
import { useSearch } from "./useSearch";

function PaymentTable() {
  const { isLoading, payments = {}, count } = useAllPayments();
  const { isLoading: isLoading2, payment } = useSearch();

  const [searchParams] = useSearchParams();

  if (isLoading || isLoading2) return <Spinner />;
  if (!payments.length) return <Empty resourceName="payments" />;

  const filterValue = searchParams.get("search") || "";
  let filteredPayments = payments;

  if (filterValue !== "") {
    if (!payment.length) return <Empty resourceName="payment" />;
    filteredPayments = payment;
  }
  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 1fr 1fr;">
        <Table.Header>
          <div>Payment ID</div>
          <div>Member Name</div>
          <div>Payment Date</div>
          <div>Payment Amount</div>
        </Table.Header>
        <Table.Body
          data={filteredPayments}
          render={(payment) => (
            <PaymentRow payment={payment} key={payment.paymentID} />
          )}
        />
        {!payment.length ? (
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        ) : null}
      </Table>
    </Menus>
  );
}

export default PaymentTable;
