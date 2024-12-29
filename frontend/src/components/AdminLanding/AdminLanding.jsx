import { Paper, ScrollArea, Title } from '@mantine/core'
import EventsList from '../EventsList/EventsList';
import UserSettings from '../UserSettings/UserSettings';
import classes from './AdminLanding.module.css';
import CreateEventForm from '../CreateEventForm/CreateEventForm';
import UsersList from '../UsersList/UsersList';
import QuestionsList from "../QuestionsList/QuestionsList.jsx";
import CompetitionList from "../CompetitionsList/CompetitionsList.jsx";
import TestList from "../TestList/TestList.jsx";

const AdminLanding = () => {
    return (
        <Paper className={classes.layout}>
            <Paper className={classes.settings}>
                <UserSettings />
                <CreateEventForm />
            </Paper>

            <ScrollArea mt='xl' className={classes.lists}>
                <Title mb='xl' mt='xl'>Test</Title>
                <TestList />
            </ScrollArea>
        </Paper>
    );
}

export default AdminLanding;