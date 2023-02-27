
const ONE_WEEK_MS = 604800000;

export function getWeek(fromDate) {
    let sunday = new Date(fromDate.setDate(fromDate.getDate()-fromDate.getDay()))
        ,result = [new Date(sunday)];
    while (sunday.setDate(sunday.getDate()+1) && sunday.getDay()!==0) {
        result.push((sunday).toLocaleString('sv').replace(" ", "T") + "Z")
    }
    return result.slice(1, 7);
}

export function getNextWeek(fromData) {
    fromData = Date.parse(fromData.replace("T", " ").slice(0, -1))
    fromData += ONE_WEEK_MS;
    return getWeek(new Date(fromData));
}

export function getPastWeek(fromData) {
    fromData = Date.parse(fromData.replace("T", " ").slice(0, -1))
    fromData -= ONE_WEEK_MS;
    return getWeek(new Date(fromData));
}