import PropTypes from "prop-types";
import {Card, Divider, Modal, Stack, Text, Title} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import {getAllAttendeesForEvent} from "../../../../services/attendee.services.js";
import UserContext from "../../../../context/UserContext.js";
import ListFrame from "../../../Misc/ListFrame/ListFrame.jsx";
import AttendeeCard from "./AttendeeCard.jsx";

const EventInfo = ({event, opened, setOpened}) => {

    const { jwtToken, user } = useContext(UserContext);
    const [ attendees, setAttendees ] = useState();




    const injection = {
        eventId: event.id,
        attendees: attendees,
        setAttendees: setAttendees,
    }





    useEffect(() => {
        if (user?.role === 'ADMIN') {
            getAllAttendeesForEvent(event.id, jwtToken)
                .then(allAttendees => {
                    allAttendees !== undefined &&
                    setAttendees(allAttendees)
                })
                .catch(e => console.log(e.message))
        }
    }, [event, user, jwtToken]);
    const handleClose = () => {
        setOpened(false)
    }





    const setChecker = (item, checked) => {
        if (checked) {
            return true
        } else {
            return item?.role !== "ADMIN"
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
        <Modal opened={opened} onClose={handleClose} size='800px'>
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
                    {event.start && (
                        <Text size='sm'>
                            {event.start}{event.end && (` - ${event.end}`)}
                        </Text>
                    )}
                    {event.location && (<>
                        <Divider m='xs' mb='lg' variant='dashed' />
                        <Text fw={700}>Location: {event.location}</Text>
                    </>)}
                </Card>
                <Divider mb='sm' variant='dotted' />
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