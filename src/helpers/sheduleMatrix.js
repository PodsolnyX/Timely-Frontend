function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek)
      ? null
      : [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][dayOfWeek];
}

function distribute(intervals, lesson, currentDay) {
  return intervals.map((interval, i) =>
      interval.id == lesson.timeInterval.id ? lesson : currentDay[i]
  );
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function sortTime(arr) {
  arr.sort(function (a, b) {
    var timeA = new Date("1970-01-01T" + a.startTime),
        timeB = new Date("1970-01-01T" + b.startTime);
    return timeA - timeB;
  });
  return arr;
}

export const sheduleMatrix = (schedule, timeIntervals) => {
  const sortedTimeIntervals = sortTime(timeIntervals);
  const matrix = [];

  for (let i = 0; i < 6; i++) {
    matrix.push([]);
    for (let j = 0; j < sortedTimeIntervals.length; j++) {
      matrix[i].push(null);
    }
  }


  for (let i = 0; i < schedule.length; i++) {
    switch (getDayOfWeek(schedule[i].date)) {
      case "Monday":
        matrix[0] = distribute(sortedTimeIntervals, schedule[i], matrix[0]);
        break;
      case "Tuesday":
        matrix[1] = distribute(sortedTimeIntervals, schedule[i], matrix[1]);
        break;
      case "Wednesday":
        matrix[2] = distribute(sortedTimeIntervals, schedule[i], matrix[2]);
        break;
      case "Thursday":
        matrix[3] = distribute(sortedTimeIntervals, schedule[i], matrix[3]);
        break;
      case "Friday":
        matrix[4] = distribute(sortedTimeIntervals, schedule[i], matrix[4]);
        break;
      case "Saturday":
        matrix[5] = distribute(sortedTimeIntervals, schedule[i], matrix[5]);
        break;
      default:
        break;
    }
  }

  return {
    sortedTimeIntervals,
    matrix: transpose(matrix),
  };
};