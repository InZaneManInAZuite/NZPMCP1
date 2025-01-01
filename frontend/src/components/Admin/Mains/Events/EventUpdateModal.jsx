import {Title, Divider, TextInput, Button, Modal, Textarea, Group, Checkbox, Paper, Flex} from '@mantine/core'
import { useForm } from '@mantine/form'
import UserContext from '../../../../context/UserContext.js'
import {useContext, useEffect, useState} from 'react'
import {updateEvent} from '../../../../services/event.services.js'
import '@mantine/dates/styles.css'
import {DatePickerInput, TimeInput} from '@mantine/dates'
import PropTypes from "prop-types";

const EventUpdateModal = ({event, opened, close}) => {

    const {events, setEvents, jwtToken } = useContext(UserContext);
    const [ changesPresent, setChangesPresent ] = useState(false);

    const [ startChecked, setStartChecked ] = useState(event.start);
    const [ endChecked, setEndChecked ] = useState(event.end);
    const [ locatedChecked, setLocatedChecked ] = useState(event.location);

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
            name: event.name,
            date: event.date,
            description: event.description,
            location: event.location,
            start: event.start,
            end: event.end,
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
        }
    });





    const getNewEvent = () => {
        const converted = `${(new Date(form.values.date)).toISOString().substring(0, 23)}+00:00`
        return {
            id: event.id,
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
            id: event.id,
            name: event.name,
            date: event.date,
            description: event.description,
            location: event.location,
            start: event.start,
            end: event.end,
        }
    }

    useEffect(() => {
        const newEvent = getNewEvent()
        const oldEvent = getOldEvent()
        setChangesPresent(JSON.stringify(newEvent) !== JSON.stringify(oldEvent))
    }, [event, form]);





    const handleUpdate = () => {
        const newEvent = getNewEvent()
        updateEvent(event.id, newEvent, jwtToken)
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
        <Modal size='800px' opened={opened} onClose={close}>
                    <Title order={3}>Update Event</Title>
                    <Divider mb='xl' mt='md'/>





                    <form onSubmit={form.onSubmit(() => handleUpdate())}>
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
                            minRows={4}
                            label='Description'
                            placeholder='Enter event description'
                            value={form.values.description}
                            onChange={handleDescriptionChange}
                            error={form.errors.description}
                            mt='md'
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
                            <Paper>
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
                            </Paper>
                            <Paper>
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
                            </Paper>
                        </Flex>





                        <Divider m='lg' variant='dashed'/>
                        <Checkbox
                            label='With Specified Location'
                            checked={locatedChecked}
                            onChange={onLocatedClicked}
                        />
                        <TextInput
                            label='Location'
                            placeholder='Enter event location'
                            value={form.values.location}
                            onChange={handleLocationChange}
                            disabled={!locatedChecked}
                        />





                        <Divider m='lg' variant='dashed'/>
                        <Group justify='center' mt='xl' gap='xl' grow>
                            <Button type='submit' disabled={!changesPresent}>
                                    Save
                            </Button>

                            <Button onClick={close}>
                                Cancel
                            </Button>
                        </Group>
                    </form>
        </Modal>

    );
}





EventUpdateModal.propTypes = {
    event: PropTypes.object.isRequired,
    opened: PropTypes.bool,
    close: PropTypes.func,
}

export default EventUpdateModal