import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";
import Image from "../ui/Image";
import AddMemberInstructor from "../features/MemberInstructor/AddMemberInstructor";
import MemberInstructorTableOperations from "../features/MemberInstructor/MemberInstructorTableOperations";
import MemberInstructoTable from "../features/MemberInstructor/MemberInstructoTable";
import useCurrentUser from "../features/Authentication/useCurrentUser";
import Spinner from "../ui/Spinner";
import PermissionPage from "./PermissionPage";
import { ALL, MANAGE_MEMBERINSTRUCTORS } from "../utils/constants";
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

function MemberInstructor() {
  const { isLoading, currentUser = {} } = useCurrentUser();
  if (isLoading) return <Spinner />;

  if (currentUser.permission === 0) {
    return <PermissionPage PageName={"MEMBER_INSTRUCTOR"} />;
  }
  if (
    currentUser.permission === ALL ||
    (MANAGE_MEMBERINSTRUCTORS & currentUser.permission) ===
      MANAGE_MEMBERINSTRUCTORS
  ) {
    return (
      <Padding>
        <StyledHeaderPage>
          <Heading as="h1">Manage MemberInstructors</Heading>
          <Image src="./member-instructor-list.png" />
        </StyledHeaderPage>
        <StyledOperations>
          <RowTableOperations type="horizontal">
            <AddMemberInstructor />
            <MemberInstructorTableOperations />
          </RowTableOperations>
        </StyledOperations>
        <Row>
          <MemberInstructoTable />
        </Row>
      </Padding>
    );
  } else {
    return <PermissionPage PageName={"MEMBER_INSTRUCTOR"} />;
  }
}

export default MemberInstructor;
