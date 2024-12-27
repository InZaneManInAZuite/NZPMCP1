import {Card, Button, Paper, Title, Text, UnstyledButton} from '@mantine/core';
import classes from './EventsCard.module.css';
import PropTypes from 'prop-types';
import UserContext from '../../context/UserContext';
import { useContext, useState, useEffect } from 'react';
import { addAttendeeToEvent } from '../../services/attendee.services';
import {
    IconEdit,
    IconTrash,
} from "@tabler/icons-react";

const EventsCard = ({ event }) => {

    const { isLogged, user, setUser, isAdmin } = useContext(UserContext);
    const [isJoined, setIsJoined] = useState(false);

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
            <Paper className={classes.eventSection}>
                <Paper className={classes.titleSection}>
                    <Title lineClamp={2} align='left' order={2}>{event.name}</Title>
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
            </Paper>
        </Card>
    )


}

EventsCard.propTypes = {
    event: PropTypes.object.isRequired,
}

export default EventsCard;