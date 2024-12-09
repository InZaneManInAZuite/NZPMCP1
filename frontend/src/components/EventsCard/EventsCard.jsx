import { Card, Button } from '@mantine/core';
import classes from './EventsCard.module.css';
import PropTypes from 'prop-types';
import UserContext from '../../context/UserContext';
import { useContext } from 'react';

const EventsCard = ({ event }) => {

    const { isLogged } = useContext(UserContext);

    return (
        <Card className={classes.card} withBorder>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            {isLogged && <Button>Join</Button>}
        </Card>
    )


}

EventsCard.propTypes = {
    event: PropTypes.object.isRequired,
}

export default EventsCard;