import {useContext, useState} from "react";
import PropTypes from "prop-types";
import UserContext from "./UserContext.js";
import {getCompetition} from "../services/competition.services.js";
import {
    createAttempt, getAttemptsByUser,
    getQuestionsForCompetition,
    updateAttempt
} from "../services/attempt.services.js";
import {getEvent} from "../services/event.services.js";
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
        const answersCopy = new Map(liveAttempt?.attempts);
        answersCopy.set(questionId, answerIndex);
        const newAttempt = {
            ...liveAttempt,
            attempts: answersCopy,
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