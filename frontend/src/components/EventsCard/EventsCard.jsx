import {Card, Button, Paper, Title, Text, UnstyledButton} from '@mantine/core';
import classes from './EventsCard.module.css';
import PropTypes from 'prop-types';
import UserContext from '../../context/UserContext';
import { useContext, useState, useEffect } from 'react';
import { addAttendeeToEvent } from '../../services/attendee.services';
import {useDisclosure} from "@mantine/hooks";
import EventUpdateModal from "../EventUpdateModal/EventUpdateModal.jsx";
import { IconDotsVertical } from "@tabler/icons-react";

const EventsCard = ({ item: event }) => {

    const { isLogged, user, setUser, isAdmin } = useContext(UserContext);
    const [isJoined, setIsJoined] = useState(false);
    const [ opened, { open, close }] = useDisclosure(false);

    const handleClick = () => {
        if (isJoined) {
            // Leave event
            return
        }
        // Join event
        const events = user.events;
        const updatedUser = { ...user, events: events.push(event.id) };
        setUser(updatedUser);

        setIsJoined(true);
        addAttendeeToEvent(event.id, user.id);
    }

    useEffect(() => {
        if (user && user.events) {
            setIsJoined(user.events.includes(event.id));
        }
    }, [])

    const formattedDate = new Date(event.date).toDateString();

    return (
        <Card className={classes.card} withBorder>
            <EventUpdateModal event={event} opened={opened} close={close}/>
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
                        onClick={handleClick}
                    >
                        {isJoined ? 'Joined' : 'Join'}
                    </Button>
                }

                {isAdmin && (
                    <UnstyledButton onClick={open}>
                        <IconDotsVertical/>
                    </UnstyledButton>
                )}
            </Paper>
        </Card>
    )


}

EventsCard.propTypes = {
    item: PropTypes.object.isRequired,
}

export default EventsCard;