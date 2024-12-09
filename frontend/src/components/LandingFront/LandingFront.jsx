import { Paper, Text } from '@mantine/core';
import classes from './LandingFront.module.css';
import SignInAndLogin from '../SignInAndLogIn/SignInAndLogin';

const LandingFront = () => {

    return(
        <Paper className={classes.bg}>
            <Text>
                Join us, create an account and start practicing for your exams!
            </Text>
            <SignInAndLogin />
        </Paper>
    )
}

export default LandingFront;
