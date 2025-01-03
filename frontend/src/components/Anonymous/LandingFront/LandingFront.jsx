import { Paper, Title } from '@mantine/core';
import classes from './LandingFront.module.css';
import SignInAndLogin from '../SignInAndLogIn/SignInAndLogin.jsx';
import EventCard from "../../Admin/Mains/Events/EventCard.jsx";
import ListFrame from "../../Misc/ListFrame/ListFrame.jsx";
import {useContext} from "react";
import UserContext from "../../../context/UserContext.js";

const LandingFront = () => {

    const { events } = useContext(UserContext);

    const setChecker = (item, checked) => {
        if (checked) {
            return true
        } else {
            return Date.now() < Date.parse(item.date)
        }
    }

    return(
        <Paper className={classes.bg}>
            <Title className={classes.sectionTitle} order={1}>
                Join us, and compete with the best!
            </Title>
            <SignInAndLogin />

            <Title className={classes.sectionTitle} order={1}>
                Discover what events are coming up!
            </Title>
            <ListFrame
                items={events}
                Component={EventCard}
                search={['name', 'description']}
                sort='date'
                setChecker={setChecker}
                checkBoxLabel='Include Previous Events'
            />
        </Paper>
    )
}

export default LandingFront;
