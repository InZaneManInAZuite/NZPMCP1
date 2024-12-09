import { Card, ScrollArea } from '@mantine/core';
import UserContext from '../../context/UserContext';
import { useContext } from 'react';
import classes from './EventsList.module.css';
import EventsCard from '../EventsCard/EventsCard';

const EventsList = () => {

    const { events } = useContext(UserContext);

    return (
        <ScrollArea className={classes.scroll} scrollbars='y' type='scroll'>
            <Card className={classes.eventsList}>
            {events.map(event => ( <EventsCard key={event.id} event={event} />))}
            </Card>
        </ScrollArea>
        
    )
}

export default EventsList;