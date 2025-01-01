import {
    Title,
    Divider,
    TextInput,
    Button,
    Textarea,
    Checkbox,
    Flex,
    Group,
    Stack
} from '@mantine/core'
import { useForm } from '@mantine/form'
import UserContext from '../../../../context/UserContext.js'
import {useContext, useEffect, useState} from 'react'
import {createEvent, updateEvent} from '../../../../services/event.services.js'
import '@mantine/dates/styles.css'
import { DatePickerInput, TimeInput } from '@mantine/dates'
import PropTypes from "prop-types";

const EventForm = ({event, close}) => {

    const {events, setEvents, jwtToken } = useContext(UserContext);
    const [ changesPresent, setChangesPresent ] = useState(false);

    const [ startChecked, setStartChecked ] = useState(event?.start || false);
    const [ endChecked, setEndChecked ] = useState(event?.end || false);
    const [ locatedChecked, setLocatedChecked ] = useState(event?.location || false);

    const handleNameChange = (event) => form.setFieldValue('name', event.currentTarget.value);
    const handleDescriptionChange = (event) => form.setFieldValue('description', event.currentTarget.value);
    const handleDateChange = (event) => form.setFieldValue('date', event)
    const handleStartChange = (event) => form.setFieldValue('start', event.currentTarget.value);
    const handleEndChange = (event) => form.setFieldValue('end', event.currentTarget.value);
    const handleLocationChange = (event) => form.setFieldValue('location', event.currentTarget.value);

    const onEndClicked = (event) => {
        if (endChecked) form.setFieldValue('end', '');
        setEndChecked(event.currentTarget.checked)
    }
    const onStartClicked = (event) => {
        if (startChecked) {
            form.setFieldValue('start', '');
            form.setFieldValue('end', '');
            setEndChecked(false);
        }
        setStartChecked(event.currentTarget.checked);
    }
    const onLocatedClicked = (event) => {
        if (locatedChecked) {
            form.setFieldValue('location', '');
        }
        setLocatedChecked(event.currentTarget.checked)
    }





    const form = useForm({
        initialValues: {
            name: event?.name,
            date: event?.date || new Date(),
            description: event?.description,
            location: event?.location,
            start: event?.start,
            end: event?.end,
        },
        validate: {
            name: (value) => {
                if (value.length === 0) {
                    return 'Name is required'
                }
            },
            description: (value) => {
                if (value.length === 0) {
                    return 'Description is required'
                }
            },
            date: (value) => {
                if (value.length === 0) {
                    return 'Date is required'
                }
            },
            start: (value) => {
                if ((new Date(form.values.start)) < (new Date(value))) {
                    return 'Ending time must be after start time'
                }
            }
        }
    });





    const getNewEvent = () => {
        const converted = `${(new Date(form.values.date)).toISOString().substring(0, 23)}+00:00`
        return {
            id: event?.id,
            name: form.values.name,
            date: converted,
            description: form.values.description,
            location: form.values.location,
            start: form.values.start,
            end: form.values.end,
        }
    }

    const getOldEvent = () => {
        return {
            id: event?.id,
            name: event?.name,
            date: event?.date,
            description: event?.description,
            location: event?.location,
            start: event?.start,
            end: event?.end,
        }
    }





    useEffect(() => {
        const newEvent = getNewEvent()
        const oldEvent = getOldEvent()
        setChangesPresent(JSON.stringify(newEvent) !== JSON.stringify(oldEvent))
    }, [event, form]);





    const handleCreate = () => {
        const newEvent = getNewEvent()
        createEvent(newEvent, jwtToken)
            .then((eventMade) => {
                setEvents(events.concat(eventMade))
                form.setFieldValue('name', '');
                form.setFieldValue('date', '');
                form.setFieldValue('description', '');
                form.setFieldValue('location', '');
                form.setFieldValue('start', '');
                form.setFieldValue('end', '');
            })
            .catch((err) => console.log(err))
    }

    const handleUpdate = () => {
        const newEvent = getNewEvent()
        updateEvent(event?.id, newEvent, jwtToken)
            .then(() => {
                setEvents(events.map(eachEvent => {
                    if (eachEvent.id === event.id) {
                        return newEvent
                    } else {
                        return eachEvent
                    }
                }))
                close();
            })
            .catch((err) => console.log(err))
    }





    return (
            <>
                {(event) ? (
                    <Title order={3}>Update Event</Title>
                ) : (
                    <Title order={2}>Create New Event</Title>
                )}





                <Divider m='md'/>
                    <form onSubmit={form.onSubmit(() => handleCreate())}>
                        <TextInput
                            required
                            label='Name'
                            placeholder='Enter event name'
                            value={form.values.name}
                            onChange={handleNameChange}
                            error={form.errors.name}
                        />
                        <Textarea
                            required
                            autosize
                            label='Description'
                            minRows={4}
                            placeholder='Enter event description'
                            value={form.values.description}
                            onChange={handleDescriptionChange}
                            error={form.errors.description}
                        />





                        <Divider m='lg' variant='dashed'/>
                        <DatePickerInput
                            required
                            valueFormat='YYYY-MM-DD'
                            label='Date'
                            placeholder='Enter event date'
                            value={new Date(form.values.date)}
                            onChange={handleDateChange}
                        />
                        <Flex gap='xl' wrap='wrap'  mt='lg'>
                            <Stack>
                                <Checkbox
                                    label='With Starting Time'
                                    checked={startChecked}
                                    onChange={onStartClicked}
                                />
                                <TimeInput
                                    label='Starting at:'
                                    disabled={!startChecked}
                                    value={form.values.start}
                                    onChange={handleStartChange}
                                />
                            </Stack>
                            <Stack>
                                <Checkbox
                                    label='With Ending Time'
                                    checked={endChecked}
                                    onChange={onEndClicked}
                                    disabled={!startChecked}
                                />
                                <TimeInput
                                    disabled={!startChecked || !endChecked}
                                    label='Ending at:'
                                    value={form.values.end}
                                    onChange={handleEndChange}
                                />
                            </Stack>
                        </Flex>





                        <Divider m='lg' variant='dashed'/>
                        <Checkbox
                            label='With Specified Location'
                            checked={locatedChecked}
                            onChange={onLocatedClicked}
                        />
                        <TextInput
                            mt='sm'
                            label='Location'
                            placeholder='Enter event location'
                            value={form.values.location}
                            onChange={handleLocationChange}
                            disabled={!locatedChecked}
                        />




                        <Divider m='lg' variant='dashed'/>
                        {(!event ? (
                            <Button
                                mt='sm'
                                w='100%'
                                type='submit'
                            >
                                Create Event
                            </Button>
                        ) : (
                            <Group justify='center' mt='xl' gap='xl' grow>
                                <Button disabled={!changesPresent}
                                        onClick={handleUpdate}>
                                    Save
                                </Button>

                                <Button onClick={close}>
                                    Cancel
                                </Button>
                            </Group>
                        ))}
                    </form>
            </>
    );
}





EventForm.propTypes = {
    event: PropTypes.object,
    close: PropTypes.func,
}

export default EventForm