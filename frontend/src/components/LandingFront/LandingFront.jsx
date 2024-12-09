import { Paper, Title } from '@mantine/core';
import classes from './LandingFront.module.css';
import SignInAndLogin from '../SignInAndLogIn/SignInAndLogin';
import EventsList from '../EventsList/EventsList';

const LandingFront = () => {

    return(
        <Paper className={classes.bg}>
            <Title className={classes.sectionTitle} order={1}>
                Join us, and compete with the best!
            </Title>
            <SignInAndLogin />

            <Title className={classes.sectionTitle} order={1}>
                Discover what events are coming up!
            </Title>
            <EventsList />
        </Paper>
    )
}

export default LandingFront;
