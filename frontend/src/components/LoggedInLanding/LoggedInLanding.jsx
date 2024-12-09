import { Paper } from '@mantine/core'
import EventsList from '../EventsList/EventsList';

const LoggedInLanding = () => {
    return (
        <Paper>
            <Paper>
                <EventsList />
            </Paper>
            <Paper>
            </Paper>
        </Paper>
    );
}

export default LoggedInLanding;