import axios from "axios";
import {config} from "./Config.js";

const API_URL = `${config.API}/events`

const getAllEvents = () => {
    const request = axios.get(API_URL)
    return request.then(response => response.data)
}

const getEvent = (id) => {
    const request = axios.get(`${API_URL}/${id}`)
    return request.then(response => response.data)
}

const removeEvent = (id) => {
    const request = axios.delete(`${API_URL}/${id}`)
    return request.then(response => response.data)
}

const updateEvent = (id, updatedEvent) => {
    const request = axios.put(`${API_URL}/${id}`, updatedEvent)
    return request.then(response => response.data)
}

const createEvent = (newEvent) => {
    const request = axios.post(API_URL, newEvent)
    return request.then(response => response.data)
}

export { getAllEvents, getEvent, removeEvent, updateEvent, createEvent }