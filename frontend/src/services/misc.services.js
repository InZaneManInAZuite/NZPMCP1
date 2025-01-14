

const dateInPast = (date) => {
    return Date.now() > Date.parse(date)
}

const dateTimeDifference = (date1, date2) => {
    return date1-date2
}

const timeFromNow = (dateTime) => {
    return Date.parse(dateTime) - Date.now()
}

const getTimeString = (dateTime) => {
    return new Date(dateTime).toTimeString().substring(0, 5);
}

export { dateInPast, dateTimeDifference, timeFromNow, getTimeString }