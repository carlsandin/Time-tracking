import { countTotalTime } from "../Home/functions";

// GET UNIQUE MONTHS TO DISPLAY AS SELECT OPTIONS
export function monthOptions(times) {
  let arr = [];
  times.forEach((time) => arr.push(time.date));

  return arr
    .map((x) => {
      const split = x.split("-");
      return `${split[0]}-${split[1]}`;
    })
    .filter((v, i, a) => a.indexOf(v) === i);
}
// GET LABELS AND DATA FOR CHART
export function chartData(dates, chart) {
  // GET UNIQUE VALUES FOR LABELS
  let arr = [];
  dates.forEach((date) =>
    chart === "bar"
      ? arr.push(date.date)
      : chart === "doughnut"
      ? arr.push(date.project)
      : null
  );
  const labels =
    chart === "line"
      ? monthOptions(dates)
      : arr.filter((v, i, a) => a.indexOf(v) === i).sort();

  // LOOP ALL DATES AND COUNT TOTAL TIME
  let allTimes = [];
  for (let i = 0; i < labels.length; i++) {
    let dateArr = [];
    if (chart === "line") {
      dates.forEach((x) =>
        labels[i] === x.date.split("-").slice(0, 2).join("-")
          ? dateArr.push(x)
          : null
      );
    }
    dates.forEach((x) =>
      (chart === "bar" ? x.date : chart === "doughnut" ? x.project : null) ===
      labels[i]
        ? dateArr.push(x)
        : null
    );
    const time = countTotalTime(dateArr);
    allTimes.push(time);
  }

  let data = [];

  allTimes.forEach((x) => data.push(roundTime(x)));

  return { labels: labels, data: data };
}

export function monthTime() {}

// ROUND TOTAL TIME AND DISPLAY AS FLOAT
function roundTime(time) {
  const times = time.split(":");
  let hours = parseInt(times[0]);
  let minutes = parseInt(times[1]);
  let seconds = parseInt(times[2]);

  if (seconds > 30) minutes++;

  let output = hours + minutes / 60;

  return output.toFixed(2);
}
