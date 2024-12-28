import {Card, Paper, Title, Group} from '@mantine/core';
import classes from './CompetitionCard.module.css';
import PropTypes from 'prop-types';

const CompetitionCard = ({ competition }) => {

    return (
        <Card className={classes.card} withBorder>
            <Paper className={classes.eventSection}>
                <Paper className={classes.titleSection}>
                    <Group>
                        <Title lineClamp={2} align='left' order={2}>{competition.title}</Title>
                    </Group>
                </Paper>
            </Paper>
        </Card>
    )
}

CompetitionCard.propTypes = {
    competition: PropTypes.object.isRequired,
}

export default CompetitionCard;