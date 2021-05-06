import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({ times, month, data }) {
  /*  useEffect(() => {
    setLoading(true);
    setLabels(chartData(dates, "bar").labels);
    setTimeData(chartData(dates, "bar").data);
    setLoading(false);
    options={{ maintainAspectRatio: false }}
  }, [month, change]); */

  return (
    <div className="chart">
      <Bar
        data={data}
        width={90}
        height={50}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
}

export default BarChart;
