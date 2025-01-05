import PropTypes from "prop-types";
import {Card, Divider, Group, Stack, Text, Title, UnstyledButton} from "@mantine/core";
import {useContext} from "react";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import {updateCompetition} from "../../../../../services/competition.services.js";
import UserContext from "../../../../../context/UserContext.js";
import {IconMinus} from "@tabler/icons-react";
import {useMediaQuery} from "@mantine/hooks";


const BuilderQuestionCard = ({question,  index: qNum}) => {

    const { jwtToken } = useContext(UserContext);
    const { questionsEdit, setQuestionsEdit, competitionEdit } = useContext(CompetitionContext);
    const matches = useMediaQuery('(min-width: 1600px)');

    const handleRemove = () => {
        const newQues = questionsEdit.filter(que => que.id !== question.id);
        const newCompete = {
            ...competitionEdit,
            questionIds: newQues.map(que => que.id),
        };
        updateCompetition(newCompete, jwtToken)
            .then(() => {
                setQuestionsEdit(newQues)
            })
            .catch(e => console.log(e))
    }

    const splitText = (textToSplit) => {
        return textToSplit?.split('\n');
    }

    const isCorrect = (index) => {
        return question.correctChoiceIndex === index;
    }

    return (
        <Card w={matches ? '750px' : '100%'} mt='sm'>
            <Stack gap='xs' p='sm'>
                {splitText(question.title)?.map((portion, index) => (
                    <Title ta='left' order={4} mb='sm' key={`QIT_${question.id}_${index}`} >
                        {qNum !== undefined && index === 0 ? `${qNum + 1}) ${portion}`: portion}
                    </Title>
                ))}
                <Divider mb='sm' variant='dotted' />





                <Text>Options:</Text>
                <Card>
                    {question.options?.map((option, opIndex) =>
                        <Group key={`QIO_${question.id}_${opIndex}`}>
                            <Text fw={isCorrect(opIndex) ? 700 : 300}>
                                {String.fromCharCode(97 + opIndex)}
                            </Text>
                            <Stack h='fit-content' gap={0}>
                                {splitText(option)?.map((portion, index) =>
                                    <Text
                                        fw={isCorrect(opIndex) ? 700 : 300}
                                        key={`QIOP_${question.id}_${opIndex}_${index}`}
                                    >
                                        {portion}
                                    </Text>
                                )}
                            </Stack>
                        </Group>
                    )}
                </Card>
                <Divider mb='sm' variant='dotted' />
            </Stack>





            <UnstyledButton onClick={handleRemove}>
                <IconMinus/>
            </UnstyledButton>
        </Card>
    )
}

BuilderQuestionCard.propTypes = {
    question: PropTypes.object.isRequired,
    index: PropTypes.number,
}

export default BuilderQuestionCard