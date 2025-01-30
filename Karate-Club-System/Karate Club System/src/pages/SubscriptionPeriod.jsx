import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";
import Image from "../ui/Image";
import AddPeriod from "../features/Subscription Period/AddPeriod";
import PeriodTableOperations from "../features/Subscription Period/PeriodTableOperations";
import PeriodTable from "../features/Subscription Period/PeriodTable";
import useCurrentUser from "../features/Authentication/useCurrentUser";
import Spinner from "../ui/Spinner";
import PermissionPage from "./PermissionPage";
import { ALL, MANAGE_SUBSCRIPTIONPERIODS } from "../utils/constants";
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

function SubscriptionPeriod() {
  const { isLoading, currentUser = {} } = useCurrentUser();
  if (isLoading) return <Spinner />;

  if (currentUser.permission === 0) {
    return <PermissionPage PageName={"SUBSCRIPTION_PERIODS"} />;
  }
  if (
    currentUser.permission === ALL ||
    (MANAGE_SUBSCRIPTIONPERIODS & currentUser.permission) ===
      MANAGE_SUBSCRIPTIONPERIODS
  ) {
    return (
      <Padding>
        <StyledHeaderPage>
          <Heading as="h1">Manage SubscriptionPeriod</Heading>
          <Image src="./subscription-period.png" />
        </StyledHeaderPage>
        <StyledOperations>
          <RowTableOperations type="horizontal">
            <AddPeriod />
            <PeriodTableOperations />
          </RowTableOperations>
        </StyledOperations>
        <Row>
          <PeriodTable />
        </Row>
      </Padding>
    );
  } else {
    return <PermissionPage PageName={"SUBSCRIPTION_PERIODS"} />;
  }
}

export default SubscriptionPeriod;
