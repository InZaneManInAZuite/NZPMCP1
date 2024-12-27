import axios from '../api/axios.js'

const ATTEMPT_URL = `/competitions`

const getAllAttempts = () => {
    const request = axios.get(ATTEMPT_URL)
    return request.then(response => response.data)
}

const getAttemptsByStudentEmail = (email, jwtToken) => {
    const attemptInput = {
        studentEmail: email
    }
    const request = axios.get(`${ATTEMPT_URL}/student`, JSON.stringify(attemptInput), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    })
    return request.then(response => response.data)
}

const getAttemptsByCompetition = (competitionId, jwtToken) => {
    const attemptInput = {
        competitionId: competitionId
    }
    const request = axios.get(`${ATTEMPT_URL}/competition`, JSON.stringify(attemptInput), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    })
    return request.then(response => response.data)
}

const getAttempt = (attemptId, jwtToken) => {
    const attemptInput = {
        id: attemptId
    }
    const request = axios.get(`${ATTEMPT_URL}/id`, JSON.stringify(attemptInput), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    })
    return request.then(response => response.data)
}

const createAttempt = (newAttempt, jwtToken) => {
    const request = axios.post(ATTEMPT_URL, JSON.stringify(newAttempt), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data)
}

const removeAttempt = (attemptId, jwtToken) => {
    const competeInput = {
        id: attemptId
    }
    const request = axios.delete(ATTEMPT_URL, JSON.stringify(competeInput), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    })
    return request.then(response => response.data)
}

const updateAttempt = (attemptInput, jwtToken) => {
    const request = axios.put(ATTEMPT_URL, JSON.stringify(attemptInput),{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data)
}



export {
    getAllAttempts,
    getAttemptsByCompetition,
    getAttemptsByStudentEmail,
    getAttempt,
    removeAttempt,
    updateAttempt,
    createAttempt,
}