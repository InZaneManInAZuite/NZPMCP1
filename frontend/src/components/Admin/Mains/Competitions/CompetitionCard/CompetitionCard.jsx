import {Card, Paper, Title, Group, Code, UnstyledButton} from '@mantine/core';
import classes from './CompetitionCard.module.css';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";

const CompetitionCard = ({ competition }) => {

    const navigate = useNavigate()

    const handleCompeteClick = () => {
        navigate('/admin/competition/builder')
    }

    return (
        <Card className={classes.card} withBorder>
            <Paper className={classes.eventSection}>
                <Paper className={classes.titleSection}>
                    <Group>
                        <UnstyledButton onClick={handleCompeteClick}>
                            <Title lineClamp={2} align='left' order={2}>{competition.title}</Title>
                        </UnstyledButton>
                        { competition.events?.length &&
                            <Code color='blue'>USED: {competition.events?.length}</Code>
                        }
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