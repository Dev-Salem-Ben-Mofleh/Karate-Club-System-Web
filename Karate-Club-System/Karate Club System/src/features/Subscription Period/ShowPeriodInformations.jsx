import { useLocation } from "react-router-dom";
import ShowPeriodDetails from "./ShowPeriodDetails";

function ShowPeriodInformations() {
  const location = useLocation();
  const { memberDetials, periodDetials } = location.state || {};

  return (
    <ShowPeriodDetails
      periodDetails={periodDetials}
      memberDetails={memberDetials}
    />
  );
}

export default ShowPeriodInformations;
