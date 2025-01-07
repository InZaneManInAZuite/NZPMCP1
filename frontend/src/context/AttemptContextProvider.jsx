import {useContext, useState} from "react";
import PropTypes from "prop-types";
import UserContext from "./UserContext.js";
import {getCompetition} from "../services/competition.services.js";
import {
    createAttempt, getAttemptsByUser,
    getQuestionsForCompetition,
    updateAttempt
} from "../services/attempt.services.js";
import AttemptContext from "./AttemptContext.js";
import {v4 as uuidv4} from 'uuid';

const AttemptContextProvider = ({ children }) => {

    const { jwtToken, user } = useContext(UserContext);

    // State variables to be stored
    const [liveEvent, setLiveEvent] = useState();
    const [liveCompetition, setLiveCompetition] = useState();
    const [liveAttempt, setLiveAttempt] = useState();
    const [liveAnswers, setLiveAnswers] = useState(new Map());
    const [liveQuestions, setLiveQuestions] = useState([])

    const [attempts, setAttempts] = useState([])



    const initiateLive = (navigate) => {
        getCompetition(liveEvent?.competitionId, jwtToken)
            .then(competition => {
                setLiveCompetition(competition);

                getQuestionsForCompetition(competition.id, jwtToken)
                    .then(questions => {
                        setLiveQuestions(questions);

                        getAttemptsByUser(user.id, jwtToken)
                            .then(attempts => {
                                const attempt = attempts.find(a => a.eventId === liveEvent.id);
                                if (attempt) {
                                    setLiveAttempt(attempt);
                                    setLiveAnswers(attempt.attempts)
                                } else {

                                    const newAttempt = {
                                        id: uuidv4(),
                                        studentEmail: user.email,
                                        eventId: liveEvent.id,
                                        competitionId: competition.id,
                                    }
                                    createAttempt(newAttempt, jwtToken)
                                        .then(() => {
                                            setLiveAttempt(newAttempt);
                                            setLiveAnswers(new Map());
                                        })
                                        .catch(() => navigate('/'))
                                }
                            })
                            .catch(() => navigate)
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

        let answersCopy = new Map();
        if (liveAnswers && JSON.stringify(liveAnswers) !== '{}') {
            answersCopy = new Map(liveAnswers);
        }
        answersCopy.set(questionId, parseInt(answerIndex));
        const newAttempt = {
            ...liveAttempt,
            attempts: mapToObjArray(answersCopy),
        };
        console.log(JSON.stringify(newAttempt));
        updateAttempt(newAttempt, jwtToken)
            .then(() => {
                setLiveAttempt(newAttempt);
                setLiveAnswers(answersCopy);
            })
    }

    const mapToObjArray = (map) => {

        return Array.from(map, ([key, value]) => ({key, value}))
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