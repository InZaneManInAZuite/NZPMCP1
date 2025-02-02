import PropTypes from "prop-types";
import {Button, Card, Divider, Modal, Stack, Text, Title} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import {getAllAttendeesForEvent} from "../../../../services/attendee.services.js";
import UserContext from "../../../../context/UserContext.js";
import ListFrame from "../../../Misc/ListFrame/ListFrame.jsx";
import AttendeeCard from "./AttendeeCard.jsx";
import {getCompetition} from "../../../../services/competition.services.js";
import {getEventTime} from "./EventTimeMisc.js";
import AttemptContext from "../../../../context/AttemptContext.js";
import AttemptCard from "./AttemptCard.jsx";
import EnterLiveEventButton from "./EnterLiveEventButton.jsx";
import CompetitionContext from "../../../../context/CompetitionContext.js";

const EventInfo = ({event, opened, setOpened}) => {

    const { jwtToken, user } = useContext(UserContext);
    const { attempts } = useContext(AttemptContext);
    const { removeCompetitionFromEvent } = useContext(CompetitionContext)

    const [ attendees, setAttendees ] = useState();
    const [ competition, setCompetition ] = useState(undefined);

    const [ eventAttempts, setEventAttempts ] = useState([]);




    const injection = {
        eventId: event.id,
        attendees: attendees,
        setAttendees: setAttendees,
        attempts: eventAttempts,
        event: event,
        competition: competition,
    }





    useEffect(() => {

        setEventAttempts(attempts?.filter(a => a.eventId === event.id))

        if (event.competitionId !== undefined && event.competitionId !== null) {
            getCompetition(event.competitionId, jwtToken)
                .then(c => setCompetition(c))
                .catch(e => console.log(e))
        }

        if (user?.role === 'ADMIN') {
            getAllAttendeesForEvent(event.id, jwtToken)
                .then(allAttendees => {
                    allAttendees !== undefined &&
                    setAttendees(allAttendees);
                })
                .catch(e => console.log(e))
        }
    }, [event, user, jwtToken, attempts]);





    const setChecker = (item, checked) => {
        if (checked) {
            return true
        } else {
            return item?.role !== "ADMIN"
        }
    }

    const handleRemove = () => {
        const confirmed = confirm(`Are you sure you want to remove "${competition.title}" as the competition for "${event.name}"`)
        if (confirmed) {
            removeCompetitionFromEvent(competition, event);
            setOpened(false);
        }
    }

    const splitText = (textToSplit) => {
        return textToSplit.split('\n').map((portion, index) => {
            return (
                <Text mb='sm' key={index}>{portion}</Text>
            )
        })
    }




    return(
        <Modal opened={opened} onClose={() => setOpened(false)} size='800px' zIndex={275}>
            <Title order={2}>{event.name}</Title>
            <Divider mt='lg'/>





            <Stack gap='xs' p='sm'>
                <Text>Description:</Text>
                <Card>
                    {splitText(event.description)}
                </Card>
                <Divider mb='sm' variant='dotted' />





                <Text>Setting:</Text>
                <Card>
                    <Text fw={700}>Date: {new Date(event.date).toDateString()}</Text>
                    {event.startTime && (
                        <Text size='sm'>
                            {getEventTime(event, 'startTime')}{event.endTime && (` - ${getEventTime(event, 'endTime')}`)}
                        </Text>
                    )}
                    {event.location && (<>
                        <Divider m='xs' mb='lg' variant='dashed' />
                        <Text fw={700}>Location: {event.location}</Text>
                    </>)}
                </Card>
                <Divider mb='sm' variant='dotted' />





                {(eventAttempts?.length > 0) && (<>
                    <Text mb='sm'>Attempts:</Text>
                    <ListFrame
                        height='300px'
                        width='100%'
                        noSearch
                        sort='startTime'
                        items={eventAttempts || []}
                        Component={AttemptCard}
                        injection={injection}
                    />
                </>)}





                {competition !== undefined && (<>
                    <Text>Competition:</Text>
                    <Card>
                        <Text>{competition?.title}</Text>
                        {(event?.attemptLimit > 1) && (
                            <Text size='sm'>{`Max Attempt: ${event.attemptLimit}`}</Text>
                        )}
                        <Stack mt='xl' >
                            {(user.role === "ADMIN") && (
                                <Button
                                    onClick={handleRemove}
                                    color='red'
                                >
                                    Remove
                                </Button>
                            )}
                            <EnterLiveEventButton event={event} attempts={eventAttempts} />
                        </Stack>

                    </Card>
                    </>)}
            </Stack>






            {(user?.role === 'ADMIN') && (<>
                <Text mb='sm'>Attendees:</Text>
                <ListFrame
                    width='100%'
                    items={attendees || []}
                    Component={AttendeeCard}
                    search={['name', 'email']}
                    setChecker={setChecker}
                    checkBoxLabel='Include Admins'
                    injection={injection}
                />
            </>)}
        </Modal>
    )
}

EventInfo.propTypes = {
    event: PropTypes.object,
    opened: PropTypes.bool,
    setOpened: PropTypes.func,
}

export default EventInfo