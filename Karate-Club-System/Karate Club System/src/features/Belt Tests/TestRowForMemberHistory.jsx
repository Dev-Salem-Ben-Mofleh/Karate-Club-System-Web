import { formatDate } from "../../utils/helpers";
import Table from "../../ui/Table";
import IsTrue from "../../ui/IsTrue";
import FieldMainTable from "../../ui/FieldMainTable";

function TestRowForMemberHistory({ test }) {
  const {
    date,
    instructorName,
    memberName,
    paymentID,
    rankName,
    result,
    testID,
  } = test;
  return (
    <Table.Row>
      <FieldMainTable>{testID}</FieldMainTable>
      <FieldMainTable>{memberName}</FieldMainTable>
      <FieldMainTable>{instructorName}</FieldMainTable>
      <FieldMainTable>{rankName}</FieldMainTable>
      <FieldMainTable>{formatDate(date)}</FieldMainTable>
      <FieldMainTable>{paymentID}</FieldMainTable>
      <IsTrue as={result ? "true" : "false"}>
        {result ? "true" : "false"}
      </IsTrue>
    </Table.Row>
  );
}

export default TestRowForMemberHistory;
