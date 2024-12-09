import { Card, Button } from '@mantine/core';
import classes from './EventsCard.module.css';
import PropTypes from 'prop-types';

const EventsCard = ({ event }) => {

    return (
        <Card className={classes.card}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <Button>Register</Button>
        </Card>
    )


}

EventsCard.propTypes = {
    event: PropTypes.object.isRequired,
}

export default EventsCard;