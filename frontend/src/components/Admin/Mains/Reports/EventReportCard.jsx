import {Card, Title, Text, Anchor} from '@mantine/core';
import PropTypes from 'prop-types';
import UserContext from '../../../../context/UserContext.js';
import { useContext } from 'react';
import {
    getAllAttendeesForEvent,
} from '../../../../services/attendee.services.js';
import ReportContext from "../../../../context/ReportContext.js";
import {getCompetition} from "../../../../services/competition.services.js";

const EventReportCard = ({ item: event }) => {

    const { jwtToken } = useContext(UserContext);
    const { setAttendeeReport, eventReport, setEventReport, setCompetitionReport } = useContext(ReportContext);





    const handleTitle = () => {
        getAllAttendeesForEvent(event.id, jwtToken)
            .then((allAttendees) => {
                setAttendeeReport(allAttendees);
                setEventReport(event);

                getCompetition(eventReport.competitionId, jwtToken)
                    .then(compete => {
                        setCompetitionReport(compete);
                    })
                    .catch(() => console.log('Failed to obtain competition'))
            })
            .catch(() => console.log("Failed to obtain attendees"))
    }





    return (
        <Card w='100%' withBorder p='xs'>
            <Card w='100%' h='100px'>
                <Card.Section h='60%' p='md'>
                    <Anchor c='white' onClick={handleTitle}>
                        <Title lineClamp={1} align='left' order={2}>{event.name}</Title>
                    </Anchor>
                </Card.Section>

                <Card.Section p='md'>
                    <Text lineClamp={1}>{new Date(event.date).toDateString()} - {event.description}</Text>
                </Card.Section>
            </Card>
        </Card>
    )
}





EventReportCard.propTypes = {
    item: PropTypes.object.isRequired,
}

export default EventReportCard;