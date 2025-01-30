import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ periods, ActivePeriods, numDays, periodsCount }) {
  //1.
  let numPeriods = 0;
  let sales = 0;
  let Active = 0;
  let occupation = 0;
  if (periods !== 0) numPeriods = periods.length;

  if (periods !== 0) {
    sales = periods.reduce((acc, cur) => acc + cur.fees, 0);
  }

  if (ActivePeriods !== 0) {
    Active = ActivePeriods.length;
    occupation =
      ActivePeriods.reduce((acc, cur) => acc + cur.paid, 0) /
      (numDays * periodsCount);
  }

  return (
    <>
      <Stat
        title="Periods"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numPeriods}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Active Periods"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={Active}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
