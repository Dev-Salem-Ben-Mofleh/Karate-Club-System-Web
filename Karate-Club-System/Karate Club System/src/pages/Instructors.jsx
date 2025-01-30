import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";
import Image from "../ui/Image";
import InstructorTableOperations from "../features/Instructors/InstructorTableOperations";
import AddInstructor from "../features/Instructors/AddInstructor";
import InstructorsTable from "../features/Instructors/InstructorsTable";
import useCurrentUser from "../features/Authentication/useCurrentUser";
import Spinner from "../ui/Spinner";
import PermissionPage from "./PermissionPage";
import { ALL, MANAGE_INSTRUCTORS } from "../utils/constants";
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

function Instructors() {
  const { isLoading, currentUser = {} } = useCurrentUser();
  if (isLoading) return <Spinner />;

  if (currentUser.permission === 0) {
    return <PermissionPage PageName={"INSTRUCTORS"} />;
  }
  if (
    currentUser.permission === ALL ||
    (MANAGE_INSTRUCTORS & currentUser.permission) === MANAGE_INSTRUCTORS
  ) {
    return (
      <Padding>
        <StyledHeaderPage>
          <Heading as="h1">Manage Instructors</Heading>
          <Image src="./instructor-list.png" />
        </StyledHeaderPage>
        <StyledOperations>
          <RowTableOperations type="horizontal">
            <AddInstructor />
            <InstructorTableOperations />
          </RowTableOperations>
        </StyledOperations>
        <Row>
          <InstructorsTable />
        </Row>
      </Padding>
    );
  } else {
    return <PermissionPage PageName={"INSTRUCTORS"} />;
  }
}

export default Instructors;
