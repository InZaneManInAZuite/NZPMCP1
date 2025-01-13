import {Card, Button, Title, Text, UnstyledButton, Modal, Anchor, Group, Flex} from '@mantine/core';
import PropTypes from 'prop-types';
import UserContext from '../../../../context/UserContext.js';
import { useContext, useState, useEffect } from 'react';
import {addAttendeeToEvent, removeAttendeeFromEvent} from '../../../../services/attendee.services.js';
import {IconEdit, IconTrash, IconX} from "@tabler/icons-react";
import {removeEvent} from "../../../../services/event.services.js";
import EventForm from "./EventForm.jsx";
import EventInfo from "./EventInfo.jsx";
import {useNavigate} from "react-router-dom";
import AttemptContext from "../../../../context/AttemptContext.js";
import {getAttemptsByUserAndEvent} from "../../../../services/attempt.services.js";

const EventCard = ({ item: event }) => {

    const { user, setUser, jwtToken, setEvents, events } = useContext(UserContext);
    const { setLiveEvent } = useContext(AttemptContext);
    const [isJoined, setIsJoined] = useState(false);
    const [ updateOpened, setUpdateOpened] = useState(false);
    const [ infoOpened, setInfoOpened] = useState(false);
    const [ attempts, setAttempts ] = useState(undefined);

    const navigate = useNavigate();





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

    const handleEnter = () => {
        setLiveEvent(event);
        navigate(`/competition/live/${event.id}`)
    }

    const isLive = () => {
        const isToday = (((new Date(event.date)).toDateString()) === ((new Date(Date.now())).toDateString()))

        if (!isToday) {
            return false
        } else if (event.startTime) {
            if (event.endTime) {
                return ((Date.parse(event.startTime) < Date.now()) && (Date.parse(event.endTime) > Date.now()))
            } else {
                return (Date.parse(event.startTime) < Date.now())
            }
        } else {
            return true
        }

    }





    useEffect(() => {
        if (user?.events) {
            setIsJoined(user.events?.includes(event.id) || false);

            if (event.competitionId && user.events?.includes(event.id)) {
                getAttemptsByUserAndEvent(user.id, event.id, jwtToken)
                    .then((relevantAttempts) => {
                        if (relevantAttempts) {
                            setAttempts(relevantAttempts);
                        }
                    })
                    .catch();
            }
        }
    }, [event])





    return (
        <Card w='100%' withBorder>
            {updateOpened && (
                <Modal opened={updateOpened} onClose={handleUpdateClose} size='800px'>
                    <EventForm event={event} close={handleUpdateClose}/>
                </Modal>
            )}

            {infoOpened && (
                <EventInfo event={event} opened={infoOpened} setOpened={setInfoOpened}/>
            )}





            <Flex direction={{base: 'column', sm: 'row'}} justify='flex-end'>
                <Card p='xl' w='100%' h='200px'>
                    <Card.Section h='60%' p='md'>
                        <Anchor c='white' onClick={handleTitle}>
                            <Title lineClamp={2} align='left' order={2}>{event.name}</Title>
                        </Anchor>
                    </Card.Section>

                    <Card.Section p='md'>
                        <Text lineClamp={3}>{new Date(event.date).toDateString()} - {event.description}</Text>
                    </Card.Section>
                </Card>




                {(!!user) && (
                    <Flex
                        h='100%'
                        direction={{base: 'row',sm: 'column'}}
                        justify='flex-end'
                        gap='md'
                    >
                        {(user.role === 'ADMIN') && (
                            <Group gap='md' justify='center'>
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

                        {(!!event.competitionId && isJoined && isLive()) && (
                            <Button
                                onClick={handleEnter}
                                color='yellow'
                            >
                                {attempts?.find(a => !a.endTime) ? 'Continue' : 'Enter'}
                            </Button>
                        )}


                    </Flex>
                )}
            </Flex>
        </Card>
    )
}





EventCard.propTypes = {
    item: PropTypes.object.isRequired,
}

export default EventCard;