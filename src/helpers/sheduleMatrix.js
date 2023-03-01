import axios from "axios";

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

export const sheduleMatrix = (response) => {
  const lessons = response.data;
  const dates = new Set(lessons.map(lesson => lesson.date));
  const sortedDates = Array.from(dates).sort();

  const timeIntervals = new Set(lessons.map(lesson => lesson.timeInterval));
  const sortedTimeIntervals = Array.from(timeIntervals).sort().reverse();

  const matrix = [];

  for (let i = 0; i < 6; i++) {
    matrix.push([]);
    for (let j = 0; j < sortedTimeIntervals.length; j++) {
      matrix[i].push(null);
    }
  }

  for (let i = 0; i < sortedDates.length; i++) {
    switch (getDayOfWeek(sortedDates[i])) {
      case "Monday":
        matrix[0] = distribute(sortedTimeIntervals, lessons[i], matrix[0]);
        break;
      case "Tuesday":
        matrix[1] = distribute(sortedTimeIntervals, lessons[i], matrix[1]);
        break;
      case "Wednesday":
        matrix[2] = distribute(sortedTimeIntervals, lessons[i], matrix[2]);
        break;
      case "Thursday":
        matrix[3] = distribute(sortedTimeIntervals, lessons[i], matrix[3]);
        break;
      case "Friday":
        matrix[4] = distribute(sortedTimeIntervals, lessons[i], matrix[4]);
        break;
      case "Saturday":
        matrix[5] = distribute(sortedTimeIntervals, lessons[i], matrix[5]);
        break;
      default:
        break;
    }
  }

  return {
    sortedTimeIntervals,
    sortedDates,
    matrix: transpose(matrix)
  };
};
