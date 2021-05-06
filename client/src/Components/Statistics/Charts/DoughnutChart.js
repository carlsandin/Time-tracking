import React from "react";
import { Doughnut } from "react-chartjs-2";

function DoughnutChart({ data }) {
  return (
    <div className="chart_container doughnut_container">
      <p className="chart_options">Projects</p>
      <div className="chart">
        <Doughnut
          data={data}
          width={90}
          height={50}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}

export default DoughnutChart;
