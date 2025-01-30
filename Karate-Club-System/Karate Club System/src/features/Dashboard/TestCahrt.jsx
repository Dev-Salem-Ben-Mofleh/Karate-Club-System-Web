import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;
  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const startDataLight = [
  {
    duration: "Succeed",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "Failure",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "Nothing",
    value: 0,
    color: "#43eb3d",
  },
];

function prepareData(startData, confirmedTests) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }
  if (confirmedTests === 0) {
    return incArrayValue([], "Nothing");
  }

  const data = confirmedTests
    .reduce((arr, cur) => {
      const isPass = cur.result;
      if (isPass === true) return incArrayValue(arr, "Succeed");
      if (isPass === false) return incArrayValue(arr, "Failure");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function TestCahrt({ confirmedTests }) {
  const startData = startDataLight;
  const data = prepareData(startData, confirmedTests);

  return (
    <ChartBox>
      <Heading as="h2">Result Tests duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default TestCahrt;
