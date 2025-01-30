import SearchtBy from "../../ui/SearchtBy";
import InputSearch from "../../ui/InputSearch";
import TableOperations from "../../ui/TableOperations";

function TestTableOperations() {
  return (
    <TableOperations>
      <SearchtBy
        options={[
          { value: "id", label: "ID" },
          { value: "member-name", label: "Member Name" },
          { value: "instructor-name", label: "Instructor Name" },
          { value: "rank-name", label: "Rank Name" },
        ]}
      />
      <InputSearch />
    </TableOperations>
  );
}

export default TestTableOperations;
