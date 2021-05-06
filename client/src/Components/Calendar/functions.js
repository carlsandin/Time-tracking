import moment from "moment";

export function buildCalendar(date) {
  const arr = [];

  const startDay = date.clone().startOf("month").startOf("week");
  const endDay = date.clone().endOf("month").endOf("week");

  const _date = startDay.clone().subtract(1, "day");

  while (_date.isBefore(endDay, "day")) {
    arr.push(
      Array(7)
        .fill(0)
        .map(() => _date.add(1, "day").clone())
    );
  }
  return arr;
}

export function disabledDates(day, joinedAt) {
  return (
    // Disable dates that is before joining or after the current date.
    moment(day).isBefore(joinedAt, "day") ||
    moment(day).isAfter(new Date(), "day")
  );
}
