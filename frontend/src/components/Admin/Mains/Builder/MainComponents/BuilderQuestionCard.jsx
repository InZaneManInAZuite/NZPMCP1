import PropTypes from "prop-types";
import {Card, Code, Divider, Flex, Group, Stack, Text, Title, UnstyledButton} from "@mantine/core";
import {useContext} from "react";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import {updateCompetition} from "../../../../../services/competition.services.js";
import UserContext from "../../../../../context/UserContext.js";
import {IconChevronDown, IconChevronUp, IconMinus} from "@tabler/icons-react";
import {useMediaQuery} from "@mantine/hooks";


const BuilderQuestionCard = ({question,  index: qIndex}) => {

    const { jwtToken } = useContext(UserContext);
    const { questionsEdit, setQuestionsEdit, competitionEdit } = useContext(CompetitionContext);
    const matches = useMediaQuery('(min-width: 1600px)');



    const updateQuestionsEdit = (newQues) => {
        const newCompete = {
            ...competitionEdit,
            questionIds: newQues.map(que => que.id),
        }
        updateCompetition(newCompete, jwtToken)
            .then(() => {
                setQuestionsEdit(newQues)
            })
            .catch(e => console.log(e));
    }

    const handleRemove = () => {
        const newQues = questionsEdit.filter(que => que.id !== question.id);
        updateQuestionsEdit(newQues);
    }
    const handleUp = () => {
        if (0 !== qIndex) {
            const newQues = questionsEdit.map(o => o);
            const temp = newQues[qIndex];
            newQues[qIndex] = newQues[qIndex-1];
            newQues[qIndex-1] = temp;
            updateQuestionsEdit(newQues);
        }
    }

    const handleDown = () => {
        if (questionsEdit.length-1 !== qIndex) {
            const newQues = questionsEdit.map(o => o);
            const temp = newQues[qIndex];
            newQues[qIndex] = newQues[qIndex+1];
            newQues[qIndex+1] = temp;
            updateQuestionsEdit(newQues);
        }
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
                        {qIndex !== undefined && index === 0 ? `${qIndex+1}) ${portion}`: portion}
                    </Title>
                ))}
                <Group>
                    {(question.difficulty) &&
                        <Code color={(question.difficulty) === 'Easy' ? 'green' :
                            ((question.difficulty) === 'Medium' ? 'yellow' : 'red')}
                        >
                            {question.difficulty}
                        </Code>
                    }
                    {question.topics && (
                        question.topics.map((topic, index) =>
                            <Code
                                key={`BUILDER_TOPIC_${question.id}_${index}`}
                                color='blue'
                            >
                                {topic}
                            </Code>
                        ))
                    }
                </Group>
                <Divider mb='sm' variant='dotted' />





                <Text>Options:</Text>
                <Card>
                    {question.options?.map((option, opIndex) =>
                        <Flex key={`QIO_${question.id}_${opIndex}`} gap='sm' >
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
                        </Flex>
                    )}
                </Card>
                <Divider mb='sm' variant='dotted' />
            </Stack>





            {(!(competitionEdit?.events?.length > 0)) && (
                <Flex justify='flex-end' gap='xs'>
                    {0 !== qIndex && (
                        <UnstyledButton onClick={handleUp}>
                            <IconChevronUp/>
                        </UnstyledButton>
                    )}
                    <UnstyledButton onClick={handleRemove}>
                        <IconMinus/>
                    </UnstyledButton>
                    {questionsEdit?.length-1 !== qIndex && (
                        <UnstyledButton onClick={handleDown}>
                            <IconChevronDown/>
                        </UnstyledButton>
                    )}
                </Flex>
            )}
        </Card>
    )
}





BuilderQuestionCard.propTypes = {
    question: PropTypes.object.isRequired,
    index: PropTypes.number,
}

export default BuilderQuestionCard