import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function CompareGrafico(props) {
  const data = props.data;
  return (
    <div>
      <p>Priced At: {data[0].pricedAt}</p>
      <BarChart
        width={350}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 60,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"></XAxis>
        <YAxis type="number" domain={["auto", "auto"]} />
        <Tooltip />
        <Legend />

        <Bar dataKey="price" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default CompareGrafico;
