import axios from '../api/axios.js'

const QUESTION_URL = `/questions`

const getAllQuestions = (jwtToken) => {
    const request = axios.get(QUESTION_URL, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
    return request.then(response => response.data)
}

const getQuestion = (id, jwtToken) => {
    const request = axios.get(`${QUESTION_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
    return request.then(response => response.data)
}

const createQuestion = (newQ, jwtToken) => {
    const request = axios.post(QUESTION_URL, JSON.stringify(newQ), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data)
}

const removeQuestion = (id, jwtToken) => {
    const request = axios.delete(`${QUESTION_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
    return request.then(response => response.data)
}

const updateQuestion = (qInput, jwtToken) => {
    const request = axios.put(QUESTION_URL, JSON.stringify(qInput),{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data)
}



export { getAllQuestions, getQuestion, removeQuestion, updateQuestion, createQuestion }