import SearchtBy from "../../ui/SearchtBy";
import InputSearch from "../../ui/InputSearch";
import TableOperations from "../../ui/TableOperations";

function PaymentTableOperations() {
  return (
    <TableOperations>
      <SearchtBy
        options={[
          { value: "id", label: "ID" },
          { value: "member-name", label: "Member Name" },
        ]}
      />
      <InputSearch />
    </TableOperations>
  );
}

export default PaymentTableOperations;
