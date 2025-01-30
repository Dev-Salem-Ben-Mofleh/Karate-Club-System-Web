import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";
import Image from "../ui/Image";
import BeltRankTable from "../features/BeltRanks/BeltRankTable";
import BeltRankTableOperations from "../features/BeltRanks/BeltRankTableOperations";
import useCurrentUser from "../features/Authentication/useCurrentUser";
import Spinner from "../ui/Spinner";
import PermissionPage from "./PermissionPage";
import { ALL, MANAGE_BELTRANKS } from "../utils/constants";
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

function BeltRanks() {
  const { isLoading, currentUser = {} } = useCurrentUser();
  if (isLoading) return <Spinner />;

  if (currentUser.permission === 0) {
    return <PermissionPage PageName={"BELT_RANKS"} />;
  }
  if (
    currentUser.permission === ALL ||
    (MANAGE_BELTRANKS & currentUser.permission) === MANAGE_BELTRANKS
  ) {
    return (
      <Padding>
        <StyledHeaderPage>
          <Heading as="h1">Manage Belt_Ranks</Heading>
          <Image src="./belt-ranks.jpg" />
        </StyledHeaderPage>
        <StyledOperations>
          <RowTableOperations type="horizontal">
            <BeltRankTableOperations />
          </RowTableOperations>
        </StyledOperations>
        <Row>
          <BeltRankTable />
        </Row>
      </Padding>
    );
  } else {
    return <PermissionPage PageName={"BELT_RANKS"} />;
  }
}

export default BeltRanks;
