export function countTotalTime(times) {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (times) {
    for (let i = 0; i < times.length; i++) {
      hours += times[i].h;
      minutes += times[i].m;
      seconds += times[i].s;
    }
    let totalSecs = 0;
    totalSecs += Math.floor(hours * 3600);
    totalSecs += Math.floor(minutes * 60);
    totalSecs += seconds;

    hours = Math.floor(totalSecs / 3600);
    minutes = Math.floor((totalSecs % 3600) / 60);
    seconds = Math.floor(totalSecs % 60);
    return `${hours >= 10 ? hours : "0" + hours}:${
      minutes >= 10 ? minutes : "0" + minutes
    }:${seconds >= 10 ? seconds : "0" + seconds}`;
  }
}
