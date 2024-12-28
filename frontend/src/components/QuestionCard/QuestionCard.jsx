import {Card, Paper, Title, Text, Group} from '@mantine/core';
import classes from './QuestionCard.module.css';
import PropTypes from 'prop-types';

const QuestionCard = ({ question }) => {

    console.log(question)

    return (
        <Card className={classes.card} withBorder>
            <Paper className={classes.eventSection}>
                <Paper className={classes.titleSection}>
                    <Group>
                        <Title lineClamp={2} align='left' order={2}>{question.title}</Title>
                    </Group>
                </Paper>
                <Paper className={classes.optionSection}>
                    {question.options.map((option, index) => {
                        let fw = 300;
                        if (index === question.correctChoiceIndex) {
                            fw = 700;
                        }
                        return (
                            <Group key={option + index} className={classes.optionSection}>
                                <Card className={classes.options}>
                                    <Text  fw={fw}>
                                        {String.fromCharCode(97 + index)} - {option}
                                    </Text>
                                </Card>
                            </Group>
                        )
                    })}
                </Paper>
            </Paper>
        </Card>
    )


}

QuestionCard.propTypes = {
    question: PropTypes.object.isRequired,
}

export default QuestionCard;