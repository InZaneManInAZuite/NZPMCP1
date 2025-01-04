import {useState} from "react";
import PropTypes from "prop-types";
import CompetitionContext from "./CompetitionContext.js";

const CompetitionContextProvider = ({ children }) => {

    // State variables to be stored
    const [competitions, setCompetitions] = useState([])
    const [competitionEdit, setCompetitionEdit] = useState(null)
    const [eventsEdit, setEventsEdit] = useState([])
    const [questionsEdit, setQuestionsEdit] = useState([])


    // Store object to be passed to UserContext.Provider
    const store = {
        competitions: competitions,
        setCompetitions: setCompetitions,
        competitionEdit: competitionEdit,
        setCompetitionEdit: setCompetitionEdit,
        eventsEdit: eventsEdit,
        setEventsEdit: setEventsEdit,
        questionsEdit: questionsEdit,
        setQuestionsEdit: setQuestionsEdit,
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