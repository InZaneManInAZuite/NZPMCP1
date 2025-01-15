import axios from "../api/axios.js";

const addCompetitionBuilder = (competitionId, eventId, jwtToken) => {
    const details = {competitionId, eventId}
    const request = axios.put(`/builder/add/competition`, details,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data);
}

const removeCompetitionBuilder = (competitionId, eventId, jwtToken) => {
    const details = {competitionId, eventId}
    const request = axios.put(`/builder/remove/competition`, details,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data);
}

const addQuestionBuilder = (competitionId, questionId, jwtToken) => {
    const details = {competitionId, questionId}
    const request = axios.put(`/builder/add/question`, details,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data);
}

const removeQuestionBuilder = (competitionId, questionId, jwtToken) => {
    const details = {competitionId, questionId}
    const request = axios.put(`/builder/remove/question`, details,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data);
}

export { addQuestionBuilder, addCompetitionBuilder, removeCompetitionBuilder, removeQuestionBuilder };
