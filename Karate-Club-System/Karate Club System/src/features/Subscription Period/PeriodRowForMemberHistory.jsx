import { formatDate } from "../../utils/helpers";
import Table from "../../ui/Table";
import IsTrue from "../../ui/IsTrue";
import FieldMainTable from "../../ui/FieldMainTable";

function PeriodRowForMemberHistory({ period }) {
  const {
    endDate,
    fees,
    isActive,
    name,
    paid,
    paymentID,
    periodID,
    startDate,
    subscrpitonDays,
  } = period;

  return (
    <Table.Row>
      <FieldMainTable>{periodID}</FieldMainTable>
      <FieldMainTable>{name}</FieldMainTable>
      <FieldMainTable>{fees}</FieldMainTable>
      <IsTrue as={paid ? "true" : "false"}>{paid ? "true" : "false"}</IsTrue>
      <FieldMainTable>{formatDate(startDate)}</FieldMainTable>
      <FieldMainTable>{formatDate(endDate)}</FieldMainTable>
      <FieldMainTable>{subscrpitonDays}</FieldMainTable>
      <FieldMainTable>
        {paymentID === null ? "not Paid" : paymentID}
      </FieldMainTable>
      <IsTrue as={isActive ? "true" : "false"}>
        {isActive ? "true" : "false"}
      </IsTrue>
    </Table.Row>
  );
}

export default PeriodRowForMemberHistory;
