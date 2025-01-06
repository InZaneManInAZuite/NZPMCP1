import axios from '../api/axios.js'

const COMPETE_URL = `/competitions`

const getAllCompetitions = (jwtToken) => {
    const request = axios.get(COMPETE_URL, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
    return request.then(response => response.data)
}

const getCompetition = (id, jwtToken) => {
    const request = axios.get(`${COMPETE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
    return request.then(response => response.data)
}

const createCompetition = (newCompete, jwtToken) => {
    const request = axios.post(COMPETE_URL, JSON.stringify(newCompete), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data)
}

const removeCompetition = (id, jwtToken) => {
    const request = axios.delete(`${COMPETE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
    return request.then(response => response.data)
}

const updateCompetition = (compete, jwtToken) => {
    const request = axios.put(COMPETE_URL, JSON.stringify(compete),{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data)
}



export { getAllCompetitions, getCompetition, removeCompetition, updateCompetition, createCompetition }