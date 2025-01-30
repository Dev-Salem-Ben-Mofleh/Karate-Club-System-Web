import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";
import Image from "../ui/Image";
import AddTest from "../features/Belt Tests/AddTest";
import TestTableOperations from "../features/Belt Tests/TestTableOperations";
import TestTable from "../features/Belt Tests/TestTable";
import Spinner from "../ui/Spinner";
import useCurrentUser from "../features/Authentication/useCurrentUser";
import PermissionPage from "./PermissionPage";
import { ALL, MANAGE_BELTTESTS } from "../utils/constants";
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

function Tests() {
  const { isLoading, currentUser = {} } = useCurrentUser();
  if (isLoading) return <Spinner />;

  if (currentUser.permission === 0) {
    return <PermissionPage PageName={"TESTS"} />;
  }
  if (
    currentUser.permission === ALL ||
    (MANAGE_BELTTESTS & currentUser.permission) === MANAGE_BELTTESTS
  ) {
    return (
      <Padding>
        <StyledHeaderPage>
          <Heading as="h1">Manage Belt_Tests</Heading>
          <Image src="./BeltTest.png" />
        </StyledHeaderPage>
        <StyledOperations>
          <RowTableOperations type="horizontal">
            <AddTest />
            <TestTableOperations />
          </RowTableOperations>
        </StyledOperations>
        <Row>
          <TestTable />
        </Row>
      </Padding>
    );
  } else {
    return <PermissionPage PageName={"TESTS"} />;
  }
}

export default Tests;
