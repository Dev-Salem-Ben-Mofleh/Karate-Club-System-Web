import Heading from "../ui/Heading";
import Row from "../ui/Row";
import MemberTableOperations from "../features/Members/MemberTableOperations";
import MembersTable from "../features/Members/membersTable";
import AddMember from "../features/Members/AddMember";
import styled from "styled-components";
import Image from "../ui/Image";
import useCurrentUser from "../features/Authentication/useCurrentUser";
import Spinner from "../ui/Spinner";
import PermissionPage from "./PermissionPage";
import { ALL, MANAGE_MEMBERS } from "../utils/constants";
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

function Members() {
  const { isLoading, currentUser = {} } = useCurrentUser();
  if (isLoading) return <Spinner />;

  if (currentUser.permission === 0) {
    return <PermissionPage PageName={"MEMBERS"} />;
  }
  if (
    currentUser.permission === ALL ||
    (MANAGE_MEMBERS & currentUser.permission) === MANAGE_MEMBERS
  ) {
    return (
      <Padding>
        <StyledHeaderPage>
          <Heading as="h1">Manage Members</Heading>
          <Image src="./members-list.png" />
        </StyledHeaderPage>
        <StyledOperations>
          <RowTableOperations type="horizontal">
            <AddMember />
            <MemberTableOperations />
          </RowTableOperations>
        </StyledOperations>
        <Row>
          <MembersTable />
        </Row>
      </Padding>
    );
  } else {
    return <PermissionPage PageName={"MEMBERS"} />;
  }
}

export default Members;
