import {useContext, useState} from "react";
import PropTypes from "prop-types";
import CompetitionContext from "./CompetitionContext.js";
import {
    addCompetitionBuilder,
    addQuestionBuilder,
    removeCompetitionBuilder,
    removeQuestionBuilder
} from "../services/builder.services.js";
import UserContext from "./UserContext.js";

const CompetitionContextProvider = ({ children }) => {

    const { jwtToken } = useContext(UserContext);

    // State variables to be stored
    const [competitions, setCompetitions] = useState([])
    const [competitionEdit, setCompetitionEdit] = useState(null)
    const [eventsEdit, setEventsEdit] = useState([])
    const [questionsEdit, setQuestionsEdit] = useState([])
    const [questions, setQuestions] = useState([])


    const clearEdit = () => {
        setCompetitionEdit(null);
        setEventsEdit([]);
        setQuestionsEdit([]);
    }

    const addQuestionToCompetition = (question, competition) => {
        const newQues = questionsEdit?.concat(question) || [question];
        const newCompete = {
            ...competition,
            questionIds: newQues?.map(q => q.id),
        }
        addQuestionBuilder(competition.id, question.id, jwtToken)
            .then(() => {
                setQuestionsEdit(newQues);
                setCompetitions(competitions?.map(c => (c.id === competition.id) ? newCompete : c));
            })
            .catch(e => console.log(e))
    }

    const removeQuestionFromCompetition = (question, competition) => {
        const newQues = questionsEdit?.filter(q => q.id !== question.id);
        const newCompete = {
            ...competition,
            questionIds: newQues.map(q => q.id),
        }
        removeQuestionBuilder(competition.id, question.id, jwtToken)
            .then(() => {
                setQuestionsEdit(newQues);
                setCompetitions(competitions?.map(c => (c.id === competition.id) ? newCompete : c));
            })
            .catch(e => console.log(e))
    }

    const addCompetitionToEvent = (competition, event) => {
        const newEvents = eventsEdit?.concat(event) || [event];
        const newCompete = {
            ...competition,
            events: newEvents?.map(e => e.id),
        }
        addCompetitionBuilder(competition.id, event.id, jwtToken)
            .then(() => {
                setEventsEdit(newEvents);
                setCompetitions(competitions?.map(c => (c.id === competition.id) ? newCompete : c))
            })
            .catch(e => console.log(e))
    }

    const removeCompetitionFromEvent = (competition, event) => {
        const newEvents = eventsEdit?.filter(e => e.id !== event.id) || [event];
        const newCompete = {
            ...competition,
            events: newEvents?.map(e => e.id),
        }
        removeCompetitionBuilder(competition.id, event.id, jwtToken)
            .then(() => {
                setEventsEdit(newEvents);
                setCompetitions(competitions?.map(c => (c.id === competition.id) ? newCompete : c));
            })
            .catch(e => console.log(e))
    }




    // Store object to be passed to UserContext.Provider
    const store = {
        competitions, setCompetitions,
        competitionEdit, setCompetitionEdit,
        eventsEdit, setEventsEdit,
        questionsEdit, setQuestionsEdit,
        questions, setQuestions,

        clearEdit,
        addQuestionToCompetition,
        removeQuestionFromCompetition,
        addCompetitionToEvent,
        removeCompetitionFromEvent,
    }

    // Return UserContext.Provider with store as value
    return (
        <CompetitionContext.Provider value={ store }>
            {children}
        </CompetitionContext.Provider>
    );
}

// PropTypes for UserContextProvider
CompetitionContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default CompetitionContextProvider;