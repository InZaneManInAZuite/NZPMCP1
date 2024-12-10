import { Card, Paper, Title, Text } from '@mantine/core';
import classes from './UserCard.module.css';
import PropTypes from 'prop-types';

const UserCard = ({ user }) => {

    return (
        <Card className={classes.card} withBorder>
            <Paper className={classes.eventSection}>
                <Paper className={classes.titleSection}>
                    <Title lineClamp={2} align='left' order={2}>{user.name}</Title>
                </Paper>
                <Text lineClamp={3}>{user.email} - {user.id}</Text>
            </Paper>
        </Card>
    )


}

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserCard;