import React from "react";
import { Line } from "react-chartjs-2";
import { chartData } from "../functions";
function LineChart({ times }) {
  const labels = chartData(times, "line").labels;
  const timeData = chartData(times, "line").data;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total hours (Month)",
        data: timeData,
        backgroundColor: "rgba(0, 0, 0, .8)",
        borderColor: "#eee",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="chart_container flow_container">
      <p className="chart_options">Months</p>
      <div className="chart">
        <Line
          data={data}
          width={90}
          height={50}
          options={{
            maintainAspectRatio: false,
            nearest: true,
            intersect: false,
          }}
        />
      </div>
    </div>
  );
}

export default LineChart;
