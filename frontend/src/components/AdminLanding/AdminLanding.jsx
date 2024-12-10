import { Paper, ScrollArea, Title } from '@mantine/core'
import EventsList from '../EventsList/EventsList';
import UserSettings from '../UserSettings/UserSettings';
import classes from './AdminLanding.module.css';

const AdminLanding = () => {
    return (
        <Paper className={classes.layout}>
            <Paper className={classes.settings}>
                <UserSettings />
            </Paper>

            <ScrollArea mt='xl' className={classes.lists}>
                <Title mb='xl' mt='xl'>Events</Title>
                <EventsList />

                <Title mb='xl' mt='xl'>Users</Title>
                <EventsList />
            </ScrollArea>
        </Paper>
    );
}

export default AdminLanding;