const ONE_WEEK_MS = 604800000;

export function getWeek(fromDate) {
    fromDate = Date.parse(fromDate.replace("T", " ").slice(0, -1))
    return calculateWeek(new Date(fromDate));
}

export function getWeekFromMS(fromDate) {
    return calculateWeek(fromDate);
}

export function getNextWeek(fromData) {
    fromData = Date.parse(fromData.replace("T", " ").slice(0, -1))
    fromData += ONE_WEEK_MS;
    return calculateWeek(new Date(fromData));
}

export function getPastWeek(fromData) {
    fromData = Date.parse(fromData.replace("T", " ").slice(0, -1))
    fromData -= ONE_WEEK_MS;
    return calculateWeek(new Date(fromData));
}

function calculateWeek(fromDate) {
    let sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay()))
        , result = [new Date(sunday)];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
        result.push((sunday).toLocaleString('sv').replace(" ", "T") + "Z")
    }
    return result.slice(1, 7);
}

export function formatDate(dateString) {
    const months = [
        "янв.",
        "февр.",
        "мар.",
        "апр.",
        "мая",
        "июня",
        "июля",
        "авг.",
        "сент.",
        "окт.",
        "нояб.",
        "дек.",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    return `${day} ${month}`;
}

export function formatDateModal(timeString, dateString) {
    const months = [
        "янв.",
        "февр.",
        "мар.",
        "апр.",
        "мая",
        "июня",
        "июля",
        "авг.",
        "сент.",
        "окт.",
        "нояб.",
        "дек.",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    return `${timeString.startTime.slice(0,5)} | ${day} ${month}`;
}