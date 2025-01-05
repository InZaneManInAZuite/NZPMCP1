import {useState} from "react";
import PropTypes from "prop-types";
import CompetitionContext from "./CompetitionContext.js";

const CompetitionContextProvider = ({ children }) => {

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


    // Store object to be passed to UserContext.Provider
    const store = {
        competitions, setCompetitions,
        competitionEdit, setCompetitionEdit,
        eventsEdit, setEventsEdit,
        questionsEdit, setQuestionsEdit,
        questions, setQuestions,

        clearEdit,
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