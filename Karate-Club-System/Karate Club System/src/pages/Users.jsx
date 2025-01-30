import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";
import Image from "../ui/Image";
import AddUser from "../features/Users/AddUser";
import UserTableOperations from "../features/Users/UserTableOperations";
import UserTable from "../features/Users/UserTable";
import useCurrentUser from "../features/Authentication/useCurrentUser";
import Spinner from "../ui/Spinner";
import { ALL, MANAGE_USERS } from "../utils/constants";
import PermissionPage from "./PermissionPage";
import RowTableOperations from "../ui/RowTableOperations";

const StyledHeaderPage = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr;
  gap: 5px;
  justify-content: center;
  padding-bottom: 10px;
`;
const Padding = styled.div`
  padding-bottom: 300px;
`;

const StyledOperations = styled.div`
  padding-bottom: 10px;
`;

function Users() {
  const { isLoading, currentUser = {} } = useCurrentUser();
  if (isLoading) return <Spinner />;

  if (currentUser.permission === 0) {
    return <PermissionPage PageName={"USERS"} />;
  }
  if (
    currentUser.permission === ALL ||
    (MANAGE_USERS & currentUser.permission) === MANAGE_USERS
  ) {
    return (
      <Padding>
        <StyledHeaderPage>
          <Heading as="h1">Manage User</Heading>
          <Image src="./Users.png" />
        </StyledHeaderPage>
        <StyledOperations>
          <RowTableOperations type="horizontal">
            <AddUser />
            <UserTableOperations />
          </RowTableOperations>
        </StyledOperations>
        <Row>
          <UserTable />
        </Row>
      </Padding>
    );
  } else {
    return <PermissionPage PageName={"USERS"} />;
  }
}

export default Users;
