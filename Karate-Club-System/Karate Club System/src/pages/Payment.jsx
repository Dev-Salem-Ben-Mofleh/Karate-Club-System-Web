import Heading from "../ui/Heading";
import Row from "../ui/Row";
import styled from "styled-components";
import Image from "../ui/Image";
import PaymentTableOperations from "../features/Payments/PaymentTableOperations";
import PaymentTable from "../features/Payments/PaymentTable";
import useCurrentUser from "../features/Authentication/useCurrentUser";
import Spinner from "../ui/Spinner";
import PermissionPage from "./PermissionPage";
import { ALL, MANAGE_PAYMENTS } from "../utils/constants";
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
function Payment() {
  const { isLoading, currentUser = {} } = useCurrentUser();
  if (isLoading) return <Spinner />;

  if (currentUser.permission === 0) {
    return <PermissionPage PageName={"PAYMENTS"} />;
  }
  if (
    currentUser.permission === ALL ||
    (MANAGE_PAYMENTS & currentUser.permission) === MANAGE_PAYMENTS
  ) {
    return (
      <Padding>
        <StyledHeaderPage>
          <Heading as="h1">Manage Payments</Heading>
          <Image src="./payment.png" />
        </StyledHeaderPage>
        <StyledOperations>
          <RowTableOperations type="horizontal">
            <PaymentTableOperations />
          </RowTableOperations>
        </StyledOperations>
        <Row>
          <PaymentTable />
        </Row>
      </Padding>
    );
  } else {
    return <PermissionPage PageName={"PAYMENTS"} />;
  }
}

export default Payment;
