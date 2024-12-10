import axios from "axios";
import config from "../Config.js";

const API_URL = config.API;

const addAttendeeToEvent = (eventId, userId) => {
    const request = axios.put(`${API_URL}/events/${eventId}/add/${userId}`);
    return request.then(response => response.data);
}

const removeAttendeeFromEvent = (eventId, userId) => {
    const request = axios.put(`${API_URL}/events/${eventId}/remove/${userId}`);
    return request.then(response => response.data);
}

const getAllAttendeesForEvent = (eventId) => {
    const request = axios.get(`${API_URL}/events/${eventId}/attendees`);
    return request.then(response => response.data);
}

const getAllEventsOfUser = (userId) => {
    const request = axios.get(`${API_URL}/users/${userId}/events`);
    return request.then(response => response.data);
}

export { addAttendeeToEvent, removeAttendeeFromEvent, getAllAttendeesForEvent, getAllEventsOfUser };