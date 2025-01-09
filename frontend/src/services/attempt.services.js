import axios from '../api/axios.js'

const ATTEMPT_URL = `/attempts`

const getAllAttempts = () => {
    const request = axios.get(ATTEMPT_URL)
    return request.then(response => response.data)
}

const getAttemptsByUser = (userId, jwtToken) => {
    const request = axios.get(`${ATTEMPT_URL}/user/${userId}`, {
        headers: {
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

const getAttemptsByUserAndEvent = (userId, eventId, jwtToken) => {
    const request = axios.get(`${ATTEMPT_URL}/user-event/${userId}/${eventId}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
    return request.then(response => response.data)
}

const getAttempt = (attemptId, jwtToken) => {
    const request = axios.get(`${ATTEMPT_URL}/id/${attemptId}`, {
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
    const request = axios.put(ATTEMPT_URL, attemptInput,{
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data)
}

const getQuestionsForCompetition = (competitionId, jwtToken) => {
    const request = axios.get(`${ATTEMPT_URL}/questions/${competitionId}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data)
}



export {
    getAllAttempts,
    getAttemptsByCompetition,
    getAttemptsByUser,
    getAttemptsByUserAndEvent,
    getAttempt,
    removeAttempt,
    updateAttempt,
    createAttempt,
    getQuestionsForCompetition,
}