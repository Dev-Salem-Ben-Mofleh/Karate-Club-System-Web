import SearchtBy from "../../ui/SearchtBy";
import Filter from "../../ui/Filter";
import InputSearch from "../../ui/InputSearch";
import TableOperations from "../../ui/TableOperations";

function UserTableOperations() {
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
          { value: "name", label: "Name" },
          { value: "user-name", label: "User Name" },
        ]}
      />
      <InputSearch />
    </TableOperations>
  );
}

export default UserTableOperations;
