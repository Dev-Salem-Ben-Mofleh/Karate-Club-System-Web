import SearchtBy from "../../ui/SearchtBy";
import Filter from "../../ui/Filter";
import InputSearch from "../../ui/InputSearch";
import TableOperations from "../../ui/TableOperations";

function MemberTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "is-active", label: "Is Active" },
          { value: "is-not-active", label: "Is Not Active" },
        ]}
      />
      <SearchtBy
        options={[
          { value: "id", label: "ID" },
          { value: "member-name", label: "Member Name" },
          { value: "phone", label: "phone" },
          { value: "rank-name", label: "Rank Name" },
        ]}
      />
      <InputSearch />
    </TableOperations>
  );
}

export default MemberTableOperations;
