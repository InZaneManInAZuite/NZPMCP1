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
import { v4 as uuidv4 } from 'uuid';
import {getEventTime} from "./EventTimeMisc.js";

const EventForm = ({event, close}) => {

    const {events, setEvents, jwtToken } = useContext(UserContext);
    const [ changesPresent, setChangesPresent ] = useState(false);

    const [ startChecked, setStartChecked ] = useState(event?.startTime || false);
    const [ endChecked, setEndChecked ] = useState(event?.endTime || false);
    const [ locatedChecked, setLocatedChecked ] = useState(event?.location || false);

    const handleNameChange = (event) => form.setFieldValue('name', event.currentTarget.value);
    const handleDescriptionChange = (event) => form.setFieldValue('description', event.currentTarget.value);
    const handleDateChange = (event) => form.setFieldValue('date', event)
    const handleStartChange = (event) => form.setFieldValue('start', event.currentTarget.value);
    const handleEndChange = (event) => form.setFieldValue('end', event.currentTarget.value);
    const handleLocationChange = (event) => form.setFieldValue('location', event.currentTarget.value);

    const onEndClicked = (event) => {
        if (endChecked) {
            form.setFieldValue('end', undefined);
        }
        setEndChecked(event.currentTarget.checked)
    }
    const onStartClicked = (event) => {
        if (startChecked) {
            form.setFieldValue('start', undefined);
            form.setFieldValue('end', undefined);
            setEndChecked(false);
        }
        setStartChecked(event.currentTarget.checked);
    }
    const onLocatedClicked = (event) => {
        if (locatedChecked) {
            form.setFieldValue('location', undefined);
        }
        setLocatedChecked(event.currentTarget.checked)
    }





    const getH = (clockTimeString) => {
        return parseInt(clockTimeString)
    }

    const getM = (clockTimeString) => {
        return parseInt(clockTimeString.substring(3))
    }





    const form = useForm({
        initialValues: {
            name: event?.name,
            date: event?.date || new Date(),
            description: event?.description,
            location: event?.location,
            start: getEventTime(event, 'startTime'),
            end: getEventTime(event, 'endTime'),
        },
        validate: {
            name: (value) => {
                if (!value || value.length === 0) {
                    return 'Name is required'
                }
            },
            description: (value) => {
                if (!value || value.length === 0) {
                    return 'Description is required'
                }
            },
            date: (value) => {
                if (!value || value.length === 0) {
                    return 'Date is required'
                }
            },
            start: (value) => {
                if (startChecked) {
                    if (!value) {
                        return 'Please fill out or tick off'
                    }
                }
            },
            end: (value) => {
                if (endChecked) {
                    if (!value) {
                        return 'Please fill out or tick off'
                    }

                    const hourDif = getH(form.values.start) - getH(value);
                    const minDif = getM(form.values.start) - getM(value);
                    if ((hourDif > 0) || (hourDif === 0 && minDif >= 0)) {
                        return 'Ending time must be after start time'
                    }
                }
            },
            location: (value) => {
                if (locatedChecked) {
                    if (!value) {
                        return 'Please fill out or tick off'
                    }
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
            startTime: form.values.start?.toString(),
            endTime: form.values.end?.toString(),
        }
    }

    const getOldEvent = () => {
        return {
            id: event?.id,
            name: event?.name,
            date: event?.date,
            description: event?.description,
            location: event?.location,
            startTime: event?.startTime,
            endTime: event?.endTime,
        }
    }



    const parseEvent = (n) => {
        const startDate = new Date(n.date);
        const endDate = new Date(n.date);
        const start = new Date(startDate.setUTCMinutes(
            startDate.getUTCMinutes() + getH(n.startTime) * 60 + getM(n.startTime))).toISOString().substring(0, 23);
        const end = new Date(endDate.setUTCMinutes(
            endDate.getUTCMinutes() + getH(n.endTime) * 60 + getM(n.endTime))).toISOString().substring(0, 23);
        return {
            ...n,
            startTime: n.startTime ? `${start}+00:00` : undefined,
            endTime: n.endTime ? `${end}+00:00` : undefined,
        }
    }





    useEffect(() => {
        const newEvent = getNewEvent()
        const oldEvent = getOldEvent()
        setChangesPresent(JSON.stringify(newEvent) !== JSON.stringify(oldEvent))
    }, [event, form]);





    const handleCreate = () => {
        const newEvent = {...getNewEvent(), date: new Date(form.values.date), id: uuidv4()}
        const parsed = parseEvent(newEvent);
        createEvent(parsed, jwtToken)
            .then(() => {
                setEvents(events.concat(parsed));
                form.setFieldValue('name', '');
                form.setFieldValue('date', new Date());
                form.setFieldValue('description', '');
                form.setFieldValue('location', undefined);
                form.setFieldValue('start', undefined);
                form.setFieldValue('end', undefined);
            })
            .catch((err) => console.log(err))
    }

    const handleUpdate = () => {
        const newEvent = getNewEvent()
        const parsed = parseEvent(newEvent)
        updateEvent(event?.id, parsed, jwtToken)
            .then(() => {
                setEvents(events.map(eachEvent => {
                    if (eachEvent.id === event.id) {
                        return parsed
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
                    <form onSubmit={form.onSubmit(() => {
                        return event ? handleUpdate() : handleCreate()
                    })}>
                        <TextInput
                            label='Name'
                            placeholder='Enter event name'
                            value={form.values.name || ''}
                            onChange={handleNameChange}
                            error={form.errors.name}
                        />
                        <Textarea
                            autosize
                            label='Description'
                            minRows={4}
                            placeholder='Enter event description'
                            value={form.values.description || ''}
                            onChange={handleDescriptionChange}
                            error={form.errors.description}
                        />





                        <Divider m='lg' variant='dashed'/>
                        <DatePickerInput
                            valueFormat='YYYY-MM-DD'
                            label='Date'
                            placeholder='Enter event date'
                            value={new Date(form.values.date)}
                            onChange={handleDateChange}
                            error={form.errors.date}
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
                                    error={form.errors.start}
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
                                    value={form.values.end || ''}
                                    onChange={handleEndChange}
                                    error={form.errors.end}
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
                            value={form.values.location || ''}
                            onChange={handleLocationChange}
                            disabled={!locatedChecked}
                            error={form.errors.location}
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
                                        type='submit'>
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