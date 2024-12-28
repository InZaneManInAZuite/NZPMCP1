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

const getCompetition = (title, jwtToken) => {
    const competeInput = {
        title: title
    }
    const request = axios.get(`${COMPETE_URL}/title`, JSON.stringify(competeInput), {
        headers: {
            'Content-Type': 'application/json',
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

const removeCompetition = (title, jwtToken) => {
    const competeInput = {
        title: title
    }
    const request = axios.delete(COMPETE_URL, JSON.stringify(competeInput), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    })
    return request.then(response => response.data)
}

const updateCompetition = (competeInput, jwtToken) => {
    const request = axios.put(COMPETE_URL, JSON.stringify(competeInput),{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data)
}



export { getAllCompetitions, getCompetition, removeCompetition, updateCompetition, createCompetition }