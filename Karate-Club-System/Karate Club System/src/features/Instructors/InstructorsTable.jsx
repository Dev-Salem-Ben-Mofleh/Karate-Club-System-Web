import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import { useInstructors } from "./useInstructors";
import InstructorRow from "./InstructorRow";
import { useSearch } from "./useSearch";

function InstructorsTable() {
  const { isLoading, instructors = {}, count } = useInstructors();
  const { isLoading: isLoading2, instructor } = useSearch();
  const [searchParams] = useSearchParams();
  if (isLoading || isLoading2) return <Spinner />;
  if (!instructors.length) return <Empty resourceName="members" />;

  let filteredInstructors = instructors;

  const filterValue = searchParams.get("search") || "";
  if (filterValue !== "") {
    if (!instructor.length) return <Empty resourceName="members" />;
    filteredInstructors = instructor;
  }

  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 1fr 1fr 2fr 1fr;">
        <Table.Header>
          <div>Instructor ID</div>
          <div>Name</div>
          <div>Phone</div>
          <div>Date of Birth</div>
          <div>Gender</div>
          <div>qualification</div>
        </Table.Header>
        <Table.Body
          data={filteredInstructors}
          render={(Instructor) => (
            <InstructorRow
              Instructor={Instructor}
              key={Instructor.instructorID}
            />
          )}
        />
        {!instructor.length ? (
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        ) : null}
      </Table>
    </Menus>
  );
}

export default InstructorsTable;
