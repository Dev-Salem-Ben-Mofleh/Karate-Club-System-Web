import SearchtBy from "../../ui/SearchtBy";
import Filter from "../../ui/Filter";
import InputSearch from "../../ui/InputSearch";
import TableOperations from "../../ui/TableOperations";

function PeriodTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "is-active", label: "Is Active" },
          { value: "is-not-active", label: "Is Not Active" },
          { value: "is-paid", label: "Is Paid" },
          { value: "is-not-paid", label: "Is Not Paid" },
        ]}
      />
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

export default PeriodTableOperations;
