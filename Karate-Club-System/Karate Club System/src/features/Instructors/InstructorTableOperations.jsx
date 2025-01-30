import SearchtBy from "../../ui/SearchtBy";
import InputSearch from "../../ui/InputSearch";
import TableOperations from "../../ui/TableOperations";

function InstructorTableOperations() {
  return (
    <TableOperations>
      <SearchtBy
        options={[
          { value: "id", label: "ID" },
          { value: "instrucor-name", label: "Instrucor Name" },
        ]}
      />
      <InputSearch />
    </TableOperations>
  );
}

export default InstructorTableOperations;
