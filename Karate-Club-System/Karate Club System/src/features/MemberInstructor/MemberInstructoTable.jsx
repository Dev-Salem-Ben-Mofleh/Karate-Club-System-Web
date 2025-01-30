import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import { useAllMemberInstructors } from "./useAllMemberInstructor";
import MemberInstructorRow from "./MemberInstructorRow";
import { useSearch } from "./useSearch";

function MemberInstructoTable() {
  const {
    isLoading,
    memberInstructors = {},
    count,
  } = useAllMemberInstructors();
  const { isLoading: isLoading2, memberInstructor } = useSearch();
  const [searchParams] = useSearchParams();
  if (isLoading || isLoading2) return <Spinner />;
  if (!memberInstructors.length) return <Empty resourceName="members" />;

  const filterValue = searchParams.get("search") || "";
  let filteredMemberInstructors = memberInstructors;
  if (filterValue !== "") {
    if (!memberInstructor.length) return <Empty resourceName="members" />;
    filteredMemberInstructors = memberInstructor;
  }

  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 1fr 1fr;">
        <Table.Header>
          <div>Member_InstructorID</div>
          <div>Instructor Name</div>
          <div>Mmeber Name</div>
          <div>Assign Date</div>
        </Table.Header>
        <Table.Body
          data={filteredMemberInstructors}
          render={(memberInstructor) => (
            <MemberInstructorRow
              memberInstructor={memberInstructor}
              key={memberInstructors.memberInstructorID}
            />
          )}
        />
        {!memberInstructor.length ? (
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        ) : null}
      </Table>
    </Menus>
  );
}

export default MemberInstructoTable;
