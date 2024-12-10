import { Paper } from '@mantine/core'
import EventsList from '../EventsList/EventsList';
import UserSettings from '../UserSettings/UserSettings';
import classes from './LoggedInLand.module.css';

const LoggedInLanding = () => {
    return (
        <Paper className={classes.layout}>
            <Paper className={classes.settings}>
                <UserSettings />
            </Paper>

            <Paper mt='xl' className={classes.lists}>
                <EventsList />
            </Paper>
        </Paper>
    );
}

export default LoggedInLanding;