import { useState } from "react"
import PropTypes from 'prop-types'
import ReportContext from "./ReportContext.js";

const ReportContextProvider = ({ children }) => {

    // State variables to be stored
    const [reportable, setReportable] = useState([])
    const [eventReport, setEventReport] = useState(undefined);
    const [attendeeReport, setAttendeeReport] = useState([])
    const [competitionReport, setCompetitionReport] = useState(undefined)

    // Store object to be passed to UserContext.Provider
    const store = {
        reportable, setReportable,
        eventReport, setEventReport,
        attendeeReport, setAttendeeReport,
        competitionReport, setCompetitionReport
    }

    // Return UserContext.Provider with store as value
    return (
        <ReportContext.Provider value={ store }>
            {children}
        </ReportContext.Provider>
    );
}



// PropTypes for UserContextProvider
ReportContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ReportContextProvider;