import axios from "../api/axios.js"

const addAttendeeToEvent = (eventId, userId, jwtToken) => {
    const details = {
        userId: userId,
        eventId: eventId,
    }
    const request = axios.put(`/events/${eventId}/add/${userId}`, details,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data);
}

const removeAttendeeFromEvent = (eventId, userId, jwtToken) => {
    const details = {
        userId: userId,
        eventId: eventId,
    }
    const request = axios.put(`/events/${eventId}/remove/${userId}`, details,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data);
}

const getAllAttendeesForEvent = (eventId, jwtToken) => {
    const request = axios.get(`/events/${eventId}/attendees`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data);
}

const getAllEventsOfUser = (userId, jwtToken) => {
    const request = axios.get(`/users/${userId}/events`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data);
}

export { addAttendeeToEvent, removeAttendeeFromEvent, getAllAttendeesForEvent, getAllEventsOfUser };