

const dateInPast = (date) => {
    return Date.now() > Date.parse(date)
}

const dateTimeDifference = (date1, date2) => {
    return date1-date2
}

const timeFromNow = (dateTime) => {
    return Date.parse(dateTime) - Date.now()
}

export { dateInPast, dateTimeDifference, timeFromNow }