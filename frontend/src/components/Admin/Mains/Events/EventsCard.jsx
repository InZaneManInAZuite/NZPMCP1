import {Card, Button, Paper, Title, Text, UnstyledButton, Flex, Modal, Anchor, Stack, Group} from '@mantine/core';
import classes from './AdminEvents.module.css';
import PropTypes from 'prop-types';
import UserContext from '../../../../context/UserContext.js';
import { useContext, useState, useEffect } from 'react';
import { addAttendeeToEvent } from '../../../../services/attendee.services.js';
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {removeEvent} from "../../../../services/event.services.js";
import EventForm from "./EventForm.jsx";
import EventInfo from "./EventInfo.jsx";

const EventsCard = ({ item: event }) => {

    const { isLogged, user, setUser, isAdmin, jwtToken, setEvents, events } = useContext(UserContext);
    const [isJoined, setIsJoined] = useState(false);
    const [ updateOpened, setUpdateOpened] = useState(false);
    const [ infoOpened, setInfoOpened] = useState(false)





    const handleUpdateClose = () => {
        setUpdateOpened(false)
    }

    const handleUpdateOpen = () => {
        setUpdateOpened(true)
    }





    const handleTitle = () => {
        setInfoOpened(true)
    }

    const handleJoin = () => {
        if (!isJoined) {
            addAttendeeToEvent(event.id, user.id, jwtToken)
                .then(() => {
                    const events = user.events;
                    const updatedUser = { ...user, events: events?.push(event.id) || [event.id] };
                    setUser(updatedUser);
                    setIsJoined(true);
                })
                .catch(e => console.log(e.message));
        }
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





    return (
        <Card className={classes.card} withBorder>
            {updateOpened && (
                <Modal opened={updateOpened} onClose={handleUpdateClose} size='800px'>
                    <EventForm event={event} close={handleUpdateClose}/>
                </Modal>
            )}

            {infoOpened && (
                <EventInfo event={event} opened={infoOpened} setOpened={setInfoOpened}/>
            )}





            <Paper className={classes.eventSection}>
                <Paper className={classes.titleSection}>
                    <Anchor c='white' onClick={handleTitle}>
                        <Title lineClamp={2} align='left' order={2}>{event.name}</Title>
                    </Anchor>

                </Paper>
                <Text lineClamp={3}>{new Date(event.date).toDateString()} - {event.description}</Text>
            </Paper>





            <Paper className={classes.buttonSection}>
                {(isLogged) && (
                    <Stack>
                        {isAdmin && (
                            <Group w='100%' gap='md' justify='center'>
                                <UnstyledButton onClick={handleUpdateOpen}>
                                    <IconEdit size='35px'/>
                                </UnstyledButton>
                                <UnstyledButton onClick={handleDelete}>
                                    <IconTrash size='35px'/>
                                </UnstyledButton>
                            </Group>
                        )}

                        <Button
                            disabled={isJoined}
                            className={classes.button}
                            onClick={handleJoin}
                        >
                            {isJoined ? 'Joined' : 'Join'}
                        </Button>
                    </Stack>
                )}

            </Paper>
        </Card>
    )
}





EventsCard.propTypes = {
    item: PropTypes.object.isRequired,
}

export default EventsCard;