import {Card, Button, Paper, Title, Text, UnstyledButton, Flex} from '@mantine/core';
import classes from './AdminEvents.module.css';
import PropTypes from 'prop-types';
import UserContext from '../../../../context/UserContext.js';
import { useContext, useState, useEffect } from 'react';
import { addAttendeeToEvent } from '../../../../services/attendee.services.js';
import {useDisclosure} from "@mantine/hooks";
import EventUpdateModal from "./EventUpdateModal.jsx";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {removeEvent} from "../../../../services/event.services.js";

const EventsCard = ({ item: event }) => {

    const { isLogged, user, setUser, isAdmin, jwtToken, setEvents, events } = useContext(UserContext);
    const [isJoined, setIsJoined] = useState(false);
    const [ openedUpdate, { open, close }] = useDisclosure(false);

    const handleJoin = () => {
        if (isJoined) {
            // Leave event
            return
        }
        // Join event
        const events = user.events;
        const updatedUser = { ...user, events: events.push(event.id) };
        setUser(updatedUser, jwtToken);

        setIsJoined(true);
        addAttendeeToEvent(event.id, user.id);
    }

    const handleDelete = () => {
        const confirmed = confirm('Are you sure you want to delete this?')
        if (confirmed) {
            removeEvent(event.id, jwtToken)
                .then(() => {
                    setEvents(events.filter(eachEvent => eachEvent.id !== event.id));
                })
                .catch((err) => console.log(err));
        }
    }

    useEffect(() => {
        if (user && user.events) {
            setIsJoined(user.events.includes(event.id));
        }
    }, [])

    const formattedDate = new Date(event.date).toDateString();

    return (
        <Card className={classes.card} withBorder>
            {openedUpdate && (<EventUpdateModal event={event} opened={openedUpdate} close={close}/>)}
            <Paper className={classes.eventSection}>
                <Paper className={classes.titleSection}>
                    <UnstyledButton>
                        <Title lineClamp={2} align='left' order={2}>{event.name}</Title>
                    </UnstyledButton>

                </Paper>
                <Text lineClamp={3}>{formattedDate} - {event.description}</Text>
            </Paper>
            <Paper className={classes.buttonSection}>
                {(isLogged && !isAdmin) && 
                    <Button 
                        disabled={isJoined} 
                        className={classes.button} 
                        onClick={handleJoin}
                    >
                        {isJoined ? 'Joined' : 'Join'}
                    </Button>
                }

                {isAdmin && (
                    <Flex w='fit-content' gap='md'>
                        <UnstyledButton onClick={open}>
                            <IconEdit size='35px'/>
                        </UnstyledButton>
                        <UnstyledButton onClick={handleDelete}>
                            <IconTrash size='35px'/>
                        </UnstyledButton>
                    </Flex>

                )}
            </Paper>
        </Card>
    )


}

EventsCard.propTypes = {
    item: PropTypes.object.isRequired,
}

export default EventsCard;