import DashboardFilter from "../features/Dashboard/DashboardFilter";
import DashboardLayout from "../features/Dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import RowTableOperations from "../ui/RowTableOperations";

function Dashboards() {
  return (
    <>
      <RowTableOperations type="horizontal">
        <Heading as="h2">Dashboard</Heading>
        <DashboardFilter />
      </RowTableOperations>
      <DashboardLayout />
    </>
  );
}

export default Dashboards;
