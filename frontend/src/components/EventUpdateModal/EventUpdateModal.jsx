import {Paper, Card, Title, Divider, TextInput, Button, Modal, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import UserContext from '../../context/UserContext'
import {useContext, useState} from 'react'
import classes from './EventUpdateModal.module.css'
import {removeEvent, updateEvent} from '../../services/event.services'
import '@mantine/dates/styles.css'
import { DatePickerInput } from '@mantine/dates'
import PropTypes from "prop-types";

const EventUpdateModal = ({event, opened, close}) => {

    const {events, setEvents, jwtToken } = useContext(UserContext);
    const [newDate, setNewDate] = useState(new Date(event.date));

    const form = useForm({
        initialValues: {
            name: event.name,
            description: event.description,
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
            }
        }
    });

    const handleDelete = () => {
        removeEvent(event.id, jwtToken)
            .then(() => {
                setEvents(events.filter(eachEvent => eachEvent.id !== event.id));
                close();
            })
            .catch((err) => console.log(err));
    }


    const handleUpdate = () => {

        const newEvent = {
            name: form.values.name,
            date: newDate,
            description: form.values.description,
        }

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

    const handleNameChange = (event) => {form.setFieldValue('name', event.currentTarget.value)};
    const handleDescriptionChange = (event) => {form.setFieldValue('description', event.currentTarget.value)};

    return (
        <Modal opened={opened} onClose={close} className={classes.modal} fullScreen>
            <Paper p='xl' className={classes.side}>
                <Card p='xl'>
                    <Title order={1}>Event</Title>
                    <Divider m='md'/>
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
                        />
                        <DatePickerInput
                            required
                            valueFormat='YYYY-MM-DD'
                            label='Date'
                            placeholder='Enter event date'
                            value={newDate}
                            onChange={setNewDate}
                        />

                        <Card className={classes.buttonGroup}>
                            <Button
                                className={classes.save}
                                type='submit'
                            >
                                Save Event
                            </Button>

                            <Button
                                className={classes.save}
                                onClick={handleDelete}
                            >
                                Remove Event
                            </Button>
                        </Card>

                    </form>
                </Card>
            </Paper>
        </Modal>

    );
}

EventUpdateModal.propTypes = {
    event: PropTypes.object.isRequired,
    opened: PropTypes.bool,
    close: PropTypes.func,
}

export default EventUpdateModal