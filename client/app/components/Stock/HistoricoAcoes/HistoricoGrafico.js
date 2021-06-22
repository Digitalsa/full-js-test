import { useTheme } from "@material-ui/core/styles";
import React from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function HistoricoGrafico(props) {
  const theme = useTheme();
  const dataChart = props.data;

  return (
    <div>
      <LineChart
        width={800}
        height={200}
        data={dataChart}
        margin={{
          top: 16,
          right: 16,
          left: 24,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="pricedAt" reversed />
        <YAxis
          type="number"
          domain={["auto", "auto"]}
          stroke={theme.palette.text.secondary}
        >
          <Label
            angle={270}
            position="left"
            style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
          >
            Prices ($)
          </Label>
        </YAxis>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="opening" stroke="#ff00f2" dot={false} />
        <Line type="monotone" dataKey="closing" stroke="#00b509" dot={false} />
        <Line type="monotone" dataKey="high" stroke="#1934d1" dot={false} />
        <Line type="monotone" dataKey="closing" stroke="#ff0000" dot={false} />
        <Line type="monotone" dataKey="low" stroke="#008cff" dot={false} />
      </LineChart>
    </div>
  );
}

export default HistoricoGrafico;
