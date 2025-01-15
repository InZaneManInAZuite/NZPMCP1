import {useContext, useState, useEffect} from "react";
import PropTypes from "prop-types";
import UserContext from "./UserContext.js";
import {getCompetition} from "../services/competition.services.js";
import {
    createAttempt, getAttemptsByUser, getAttemptsByUserAndEvent,
    getQuestionsForCompetition,
    updateAttempt
} from "../services/attempt.services.js";
import AttemptContext from "./AttemptContext.js";
import {v4 as uuidv4} from 'uuid';

const AttemptContextProvider = ({ children }) => {

    const { jwtToken, user } = useContext(UserContext);

    // State variables to be stored
    const [liveEvent, setLiveEvent] = useState(undefined);
    const [liveCompetition, setLiveCompetition] = useState(undefined);
    const [liveAttempt, setLiveAttempt] = useState(undefined);
    const [liveAnswers, setLiveAnswers] = useState([]);
    const [liveQuestions, setLiveQuestions] = useState([])

    const [attempts, setAttempts] = useState([])





    useEffect(() => {
        if (user) {
            getAttemptsByUser(user.id, jwtToken)
                .then((allUserAttempts) => {
                    setAttempts(allUserAttempts)
                })
                .catch(e => console.log(e));
        }
    }, [user, jwtToken]);





    const initiateLive = (navigate) => {
        getCompetition(liveEvent?.competitionId, jwtToken)
            .then(competition => {
                setLiveCompetition(competition);

                getQuestionsForCompetition(competition.id, jwtToken)
                    .then(questions => {
                        setLiveQuestions(questions);

                        getAttemptsByUserAndEvent(user.id, liveEvent.id, jwtToken)
                            .then((attempts) => {
                                const attempt = attempts?.find(a => !a.endTime);
                                if (attempt) {
                                    setLiveAttempt(attempt);
                                    setLiveAnswers(attempt.answers);
                                } else {
                                    const newAttempt = {
                                        id: uuidv4(),
                                        userId: user.id,
                                        eventId: liveEvent.id,
                                        competitionId: competition.id,
                                        answers: [],
                                        startTime: Date.now(),
                                    }
                                    createAttempt(newAttempt, jwtToken)
                                        .then(() => {
                                            setLiveAttempt(newAttempt);
                                            setLiveAnswers([]);
                                            setAttempts(attempts?.concat(newAttempt) || [newAttempt])
                                        })
                                        .catch(() => navigate('/'))
                                }
                            })
                            .catch(() => navigate('/'));
                    })
                    .catch(() => navigate('/'));
            })
            .catch(() => navigate('/'))
    }





    const clearLiveAttempt = () => {
        setLiveEvent(undefined);
        setLiveCompetition(undefined);
        setLiveAttempt(undefined);
        setLiveAnswers([]);
        setLiveQuestions([]);
    }

    const clearAttempts = () => {
        clearLiveAttempt()
        setAttempts([])
    }





    const editAnswer = (questionId, answerIndex) => {

        const answersCopy = liveAnswers.map(o => o);
        const index = answersCopy.map(ans => ans.questionId).indexOf(questionId);
        if (index !== -1) {
            answersCopy[index] = { questionId, answerIndex: parseInt(answerIndex) };
        } else {
            answersCopy.push( { questionId, answerIndex: parseInt(answerIndex) } );
        }

        const newAttempt = {
            ...liveAttempt,
            answers: answersCopy,
        };

        updateAttempt(newAttempt, jwtToken)
            .then(() => {
                setLiveAttempt(newAttempt);
                setLiveAnswers(answersCopy);
            })
    }





    // Store object to be passed to UserContext.Provider
    const store = {
        liveEvent, setLiveEvent,
        liveCompetition, setLiveCompetition,
        liveAttempt, setLiveAttempt,
        liveAnswers, setLiveAnswers,
        liveQuestions, setLiveQuestions,

        attempts, setAttempts,

        initiateLive, clearAttempts, clearLiveAttempt,

        editAnswer,
    }





    // Return UserContext.Provider with store as value
    return (
        <AttemptContext.Provider value={ store }>
            {children}
        </AttemptContext.Provider>
    );
}





// PropTypes for UserContextProvider
AttemptContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AttemptContextProvider;