import {Card, Paper, Title, Text, Code, Group} from '@mantine/core';
import classes from './UserCard.module.css';
import PropTypes from 'prop-types';

const UserCard = ({ item: user }) => {

    return (
        <Card className={classes.card} withBorder>
            <Paper className={classes.eventSection}>
                <Paper className={classes.titleSection}>
                    <Group>
                        <Title lineClamp={2} align='left' order={2}>{user.name}</Title>
                        {user.role !== 'USER' &&
                            <Code color='blue'>{user.role}</Code>
                        }
                    </Group>
                </Paper>
                <Text lineClamp={3}>{user.email} - {user.id}</Text>
            </Paper>
        </Card>
    )



}

UserCard.propTypes = {
    item: PropTypes.object.isRequired,
}

export default UserCard;