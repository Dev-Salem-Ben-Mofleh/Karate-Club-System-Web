import { formatDate } from "../../utils/helpers";
import Table from "../../ui/Table";
import IsTrue from "../../ui/IsTrue";
import FieldMainTable from "../../ui/FieldMainTable";

function MembersRowforTrained({ member }) {
  const {
    memberID,
    name,
    beltRankName: rankName,
    gneder,
    dateOfBirth,
    phone,
    isActive,
  } = member;

  return (
    <Table.Row>
      <FieldMainTable>{memberID}</FieldMainTable>
      <FieldMainTable>{name}</FieldMainTable>
      <FieldMainTable>{rankName}</FieldMainTable>
      <FieldMainTable>{gneder}</FieldMainTable>
      <FieldMainTable>{formatDate(dateOfBirth)}</FieldMainTable>
      <FieldMainTable>{phone}</FieldMainTable>
      <IsTrue as={isActive ? "true" : "false"}>
        {isActive ? "true" : "false"}
      </IsTrue>
    </Table.Row>
  );
}

export default MembersRowforTrained;
