import { formatCurrency, formatDate } from "../../utils/helpers";
import Table from "../../ui/Table";
import FieldMainTable from "../../ui/FieldMainTable";

function PaymentRowForMemberHistory({ payment }) {
  const { amount, date, memberName, paymentID } = payment;

  return (
    <Table.Row>
      <FieldMainTable>{paymentID}</FieldMainTable>
      <FieldMainTable>{memberName}</FieldMainTable>
      <FieldMainTable>{formatDate(date)}</FieldMainTable>
      <FieldMainTable>{formatCurrency(amount)}</FieldMainTable>
    </Table.Row>
  );
}

export default PaymentRowForMemberHistory;
