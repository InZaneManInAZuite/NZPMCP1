import {useState} from "react";
import PropTypes from "prop-types";
import BuilderContext from "./BuilderContext.js";

const BuilderContextProvider = ({ children }) => {

    // State variables to be stored
    const [competitions, setCompetitions] = useState([])
    const [competitionEdit, setCompetitionEdit] = useState(null)
    const [eventsEdit, setEventsEdit] = useState([])
    const [questionsEdit, setQuestionsEdit] = useState([])


    // Store object to be passed to UserContext.Provider
    const store = {
        competitions,setCompetitions,
        competitionEdit, setCompetitionEdit,
        eventsEdit, setEventsEdit,
        questionsEdit, setQuestionsEdit,
    }

    // Return UserContext.Provider with store as value
    return (
        <BuilderContext.Provider value={ store }>
            {children}
        </BuilderContext.Provider>
    );
}

// PropTypes for UserContextProvider
BuilderContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default BuilderContextProvider;