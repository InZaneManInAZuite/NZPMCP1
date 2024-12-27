import axios from '../api/axios.js'

const QUESTION_URL = `/competitions`

const getAllQuestions = () => {
    const request = axios.get(QUESTION_URL)
    return request.then(response => response.data)
}

const getQuestion = (title, jwtToken) => {
    const qInput = {
        title: title
    }
    const request = axios.get(`${QUESTION_URL}/title`, JSON.stringify(qInput), {
        headers: {
            'Content-Type': 'application/json',
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

const removeQuestion = (title, jwtToken) => {
    const qInput = {
        title: title
    }
    const request = axios.delete(QUESTION_URL, JSON.stringify(qInput), {
        headers: {
            'Content-Type': 'application/json',
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