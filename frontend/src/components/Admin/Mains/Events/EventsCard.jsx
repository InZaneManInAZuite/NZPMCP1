import {Card, Button, Title, Text, UnstyledButton, Modal, Anchor, Stack, Group} from '@mantine/core';
import PropTypes from 'prop-types';
import UserContext from '../../../../context/UserContext.js';
import { useContext, useState, useEffect } from 'react';
import {addAttendeeToEvent, removeAttendeeFromEvent} from '../../../../services/attendee.services.js';
import {IconEdit, IconTrash, IconX} from "@tabler/icons-react";
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
                    const updatedUser = { ...user, events: events?.concat(event.id) || [event.id] };
                    setUser(updatedUser);
                    setIsJoined(true);
                })
                .catch(e => console.log(e.message));
        }
    }

    const handleUnJoin = () => {
        if (isJoined && user.role === 'ADMIN') {
            removeAttendeeFromEvent(event.id, user.id, jwtToken)
                .then(() => {
                    const events = user.events;
                    const updatedUser = { ...user, events: events?.filter((eventId) => eventId !== event.id )};
                    setUser(updatedUser);
                    setIsJoined(false)
                })
                .catch(e => console.log(e.message))
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
        if (user?.events) {
            setIsJoined(user.events?.includes(event.id) || false);
        }
    }, [])





    return (
        <Card w='100%' h='250px' withBorder>
            {updateOpened && (
                <Modal opened={updateOpened} onClose={handleUpdateClose} size='800px'>
                    <EventForm event={event} close={handleUpdateClose}/>
                </Modal>
            )}

            {infoOpened && (
                <EventInfo event={event} opened={infoOpened} setOpened={setInfoOpened}/>
            )}





            <Group w='100%' h='100%' justify='space-between'>
                <Card p='xl' w='85%' h='100%'>
                    <Card.Section h='60%' p='md'>
                        <Anchor c='white' onClick={handleTitle}>
                            <Title lineClamp={2} align='left' order={2}>{event.name}</Title>
                        </Anchor>
                    </Card.Section>

                    <Card.Section p='md'>
                        <Text lineClamp={3}>{new Date(event.date).toDateString()} - {event.description}</Text>
                    </Card.Section>
                </Card>




                {(isLogged) && (
                    <Stack h='100%' justify='center' w='fit-content'>
                        {(isAdmin) && (
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
                            w='125px'
                            variant='filled'
                            color={isJoined ? 'red' : 'blue'}
                            justify='space-between'
                            rightSection={(user?.role === 'ADMIN' && isJoined) ? <IconX size='15px' /> : <span/>}
                            leftSection={<span/>}
                            disabled={isJoined && user?.role !== 'ADMIN'}
                            onClick={isJoined ? handleUnJoin : handleJoin}
                        >
                            {isJoined ? 'Joined' : 'Join'}
                        </Button>

                    </Stack>
                )}
            </Group>
        </Card>
    )
}





EventsCard.propTypes = {
    item: PropTypes.object.isRequired,
}

export default EventsCard;