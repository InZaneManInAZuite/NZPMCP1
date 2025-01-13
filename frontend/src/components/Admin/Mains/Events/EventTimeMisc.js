const getTime = (event, val) => {
    if (event && event[val]) {
        return (new Date(event[val]))?.toTimeString()?.substring(0, 5);
    } else {
        return undefined;
    }
}

export {getTime}