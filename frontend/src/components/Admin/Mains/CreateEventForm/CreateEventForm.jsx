import {Card, Title, Divider, TextInput, Button, Textarea} from '@mantine/core'
import { useForm } from '@mantine/form'
import UserContext from '../../../../context/UserContext.js'
import { useContext, useState } from 'react'
import { createEvent } from '../../../../services/event.services.js'
import '@mantine/dates/styles.css'
import { DatePickerInput } from '@mantine/dates'
import classes from './CreateEventForm.module.css'

const CreateEventForm = () => {

    const {events, setEvents, jwtToken } = useContext(UserContext);
    const [newDate, setNewDate] = useState(null);

    const form = useForm({
        initialValues: {
            name: '',
            description: '',
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


    const handleCreate = () => {

        if (!newDate) {
            return
        }

        const newEvent = {
            name: form.values.name,
            date: newDate,
            description: form.values.description,
        }

        createEvent(newEvent, jwtToken)
            .then((eventMade) => {
                setEvents(events.concat(eventMade))
                form.values.name = ''
                form.values.date = ''
                form.values.description = ''
            })
            .catch((err) => console.log(err))
    }

    const handleNameChange = (event) => {form.setFieldValue('name', event.currentTarget.value)};
    const handleDescriptionChange = (event) => {form.setFieldValue('description', event.currentTarget.value)};

    return (
            <Card p='xl' radius='xl' mt='xl' className={classes.frame}>
                <Title order={2}>Create New Event</Title>
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
                        <Button
                            mt='sm'
                            w='100%'
                            type='submit' 
                        >
                            Create Event
                        </Button>
                    </form>
            </Card>
    );
}

export default CreateEventForm