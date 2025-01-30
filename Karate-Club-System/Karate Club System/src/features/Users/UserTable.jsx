import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";
import { useAllBeltRanks } from "../BeltRanks/useAllBeltRanks";
import { useUsers } from "./useUsers";
import UserRow from "./UserRow";
import { useSearch } from "../Users/useSearch";

function UserTable() {
  useAllBeltRanks();

  const { isLoading, users, count } = useUsers();
  const { isLoading: isLoading2, user } = useSearch();

  const [searchParams] = useSearchParams();

  if (isLoading || isLoading2) return <Spinner />;
  if (!users.length) return <Empty resourceName="users" />;

  const filterValue = searchParams.get("search") || "";
  let filteredUsers = users;
  if (filterValue !== "") {
    if (!user.length) return <Empty resourceName="users" />;
    filteredUsers = user;
  }

  return (
    <Menus>
      <Table columns="0.6fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr;">
        <Table.Header>
          <div>User ID</div>
          <div>Name</div>
          <div>User Name</div>
          <div>Gender</div>
          <div>Date of Birth</div>
          <div>Phone</div>
          <div>is Active</div>
        </Table.Header>
        <Table.Body
          data={filteredUsers}
          render={(user) => <UserRow user={user} key={user.UserID} />}
        />
        {!user.length ? (
          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        ) : null}
      </Table>
    </Menus>
  );
}

export default UserTable;
