import { Paper, Card, Title, Divider, TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import UserContext from '../../context/UserContext'
import { useContext, useState } from 'react'
import classes from './CreateEventForm.module.css'
import { createEvent } from '../../services/event.services'
import '@mantine/dates/styles.css'
import { DatePickerInput } from '@mantine/dates'

const CreateEventForm = () => {

    const {events, setEvents } = useContext(UserContext);
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

        createEvent(newEvent)
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
        <Paper p='xl' className={classes.side}>
            <Card p='xl'>
                <Title order={1}>Create New Event</Title>
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
                        <TextInput
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
                            className={classes.save} 
                            type='submit' 
                        >
                            Create Event
                        </Button>
                    </form>
            </Card>
        </Paper>
    );
}

export default CreateEventForm