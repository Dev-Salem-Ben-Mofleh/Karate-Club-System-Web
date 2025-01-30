import SearchtBy from "../../ui/SearchtBy";
import InputSearch from "../../ui/InputSearch";
import TableOperations from "../../ui/TableOperations";

function BeltRankTableOperations() {
  return (
    <TableOperations>
      <SearchtBy
        options={[
          { value: "id", label: "ID" },
          { value: "rank-name", label: "Rank Name" },
        ]}
      />
      <InputSearch />
    </TableOperations>
  );
}

export default BeltRankTableOperations;
