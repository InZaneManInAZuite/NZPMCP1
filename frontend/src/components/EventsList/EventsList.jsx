import {Card, Checkbox, Group, LoadingOverlay, ScrollArea, Text, TextInput} from '@mantine/core';
import UserContext from '../../context/UserContext';
import {useContext, useEffect, useState} from 'react';
import classes from './EventsList.module.css';
import EventCard from '../Admin/Mains/Events/EventCard.jsx';

const EventsList = () => {

    const { events } = useContext(UserContext);
    const [ filtered, setFiltered ] = useState(events);
    const [ checked, setChecked ] = useState(false);
    const [ searching, setSearching ] = useState('');

    useEffect(() => {
        const f = events.filter(event => {
            return event.name?.toLowerCase().includes(searching.toLowerCase()) &&
                (checked || Date.now() < Date.parse(event.date));
        })
        setFiltered(f.sort((a,b) => Date.parse(a.date) - Date.parse(b.date)))
    }, [ searching, checked, events ]);

    const onSearchChange = (event) => setSearching(event.currentTarget.value)
    const onCheckChange = (event) => setChecked(event.currentTarget.checked)

    if (!filtered) {
        return (
            <LoadingOverlay/>
        )
    }

    return (
        <Card className={classes.layout} radius='md'>
            <Card.Section className={classes.bar} withBorder>
                <Group>
                    <Text>Search:</Text>
                    <TextInput
                        placeholder='Look for an event'
                        value={searching}
                        onChange={onSearchChange}
                    />
                    <Checkbox
                        labelPosition='left'
                        label="Include Previous Events"
                        checked={checked}
                        onChange={onCheckChange}
                    />
                </Group>
            </Card.Section>

            <Card.Section withBorder>
                <ScrollArea className={classes.scroll} scrollbars='y' type='scroll'>
                    <Card className={classes.eventsList}>
                        {filtered.map(event => ( <EventCard key={event.id} item={event} />))}
                    </Card>
                </ScrollArea>
            </Card.Section>
        </Card>

        
    )
}

export default EventsList;