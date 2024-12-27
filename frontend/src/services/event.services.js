import axios from '../api/axios.js'

const EVENT_URL = `/events`

const getAllEvents = () => {
    const request = axios.get(EVENT_URL)
    return request.then(response => response.data)
}

const getEvent = (id) => {
    const request = axios.get(`${EVENT_URL}/${id}`)
    return request.then(response => response.data)
}

const removeEvent = (id, jwtToken) => {
    const request = axios.delete(`${EVENT_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
    return request.then(response => response.data)
}

const updateEvent = (id, updatedEvent, jwtToken) => {
    const request = axios.put(`${EVENT_URL}/${id}`, JSON.stringify(updatedEvent),{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data)
}

const createEvent = (newEvent, jwtToken) => {
    const request = axios.post(`${EVENT_URL}`, JSON.stringify(newEvent), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data)
}

export { getAllEvents, getEvent, removeEvent, updateEvent, createEvent }