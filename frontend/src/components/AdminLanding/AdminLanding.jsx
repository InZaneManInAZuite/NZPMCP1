import { Paper, ScrollArea, Title } from '@mantine/core'
import EventsList from '../EventsList/EventsList';
import UserSettings from '../UserSettings/UserSettings';
import classes from './AdminLanding.module.css';
import CreateEventForm from '../CreateEventForm/CreateEventForm';
import UsersList from '../UsersList/UsersList';
import QuestionsList from "../QuestionsList/QuestionsList.jsx";

const AdminLanding = () => {
    return (
        <Paper className={classes.layout}>
            <Paper className={classes.settings}>
                <UserSettings />
                <CreateEventForm />
            </Paper>

            <ScrollArea mt='xl' className={classes.lists}>
                <Title mb='xl' mt='xl'>Events</Title>
                <EventsList />

                <Title mb='xl' mt='xl'>Users</Title>
                <UsersList />

                <Title mb='xl' mt='xl'>Questions</Title>
                <QuestionsList />
            </ScrollArea>
        </Paper>
    );
}

export default AdminLanding;