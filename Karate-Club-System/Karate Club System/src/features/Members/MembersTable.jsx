import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import { useMembers } from "./useMembers";
import MemberRow from "./MemberRow";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import { useAllBeltRanks } from "../BeltRanks/useAllBeltRanks";
import { useSearch } from "./useSearch";
import { useAllBeltRankForMembers } from "../BeltRanks/useAllBeltRankForMembers";

function MembersTable() {
  useAllBeltRankForMembers();
  useAllBeltRanks();
  const { isLoading, members = {}, count } = useMembers();
  const { isLoading: isLoading2, member } = useSearch();

  const [searchParams] = useSearchParams();

  if (isLoading || isLoading2) return <Spinner />;
  if (!members.length) return <Empty resourceName="members" />;
  let filteredMember = members;

  const filterValue = searchParams.get("search") || "";

  if (filterValue !== "") {
    if (!member.length) return <Empty resourceName="members" />;
    filteredMember = member;
  }

  return (
    <Menus>
      <Table columns="1fr 2fr 2fr 0.5fr 1.2fr 1.3fr 1fr 1fr;">
        <Table.Header>
          <div>Member ID</div>
          <div>Name</div>
          <div>Rank Name</div>
          <div>Gender</div>
          <div>Date of Birth</div>
          <div>Phone</div>
          <div>is Active</div>
        </Table.Header>
        <Table.Body
          data={filteredMember}
          render={(member) => (
            <MemberRow member={member} key={member.memberID} />
          )}
        />
        {!member.length ? (
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        ) : null}
      </Table>
    </Menus>
  );
}

export default MembersTable;
