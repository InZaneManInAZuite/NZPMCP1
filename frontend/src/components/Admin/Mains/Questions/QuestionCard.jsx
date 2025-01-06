import {Card, Title, UnstyledButton, Modal, Group, Code, Flex, Text, Stack} from '@mantine/core';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import {IconEdit, IconTrash} from "@tabler/icons-react";
import UserContext from "../../../../context/UserContext.js";
import {removeQuestion} from "../../../../services/question.services.js";
import QuestionForm from "./QuestionForm.jsx";
import CompetitionContext from "../../../../context/CompetitionContext.js";

const QuestionCard = ({ item: question,  }) => {

    const { jwtToken } = useContext(UserContext);
    const { questions, setQuestions } = useContext(CompetitionContext);
    const [ updateOpened, setUpdateOpened] = useState(false);





    const splitText = (textToSplit) => {
        return textToSplit?.split('\n');
    }

    const isCorrect = (index) => {
        return question.correctChoiceIndex === index;
    }





    const handleDelete = () => {
        const confirmed = confirm(`Warning you are removing ${question.title}`)
        if (confirmed) {
            removeQuestion(question.id, jwtToken)
                .then(() => {
                    setQuestions(questions.filter(eachQue => eachQue.id !== question.id));
                })
                .catch(e => console.log(e));
        }
    }





    return (
        <Card w='100%' p='lg' withBorder>
            {updateOpened && (
                <Modal opened={updateOpened} onClose={() => setUpdateOpened(false)} size='800px'>
                    <QuestionForm question={question} close={() => setUpdateOpened(false)}/>
                </Modal>
            )}

            <Card.Section p='lg'>
                <Flex direction={{base: 'column', sm: 'row'}} justify='flex-end'>
                    <Card p='sm' w='100%'>
                        <Stack>
                            {splitText(question.title)?.map((portion, index) => (
                                <Title ta='left' order={4} mb='sm' key={`MQCP_${question.id}_${index}`} >
                                    {portion}
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
                                            key={`TOPIC_${question.id}_${index}`}
                                            color='blue'
                                        >
                                            {topic}
                                        </Code>
                                    ))
                                }
                            </Group>
                        </Stack>
                    </Card>


                    <Flex gap='sm'>
                        <UnstyledButton onClick={() => setUpdateOpened(true)}>
                            <IconEdit size='35px'/>
                        </UnstyledButton>
                        <UnstyledButton onClick={handleDelete}>
                            <IconTrash size='35px'/>
                        </UnstyledButton>
                    </Flex>
                </Flex>
            </Card.Section>





            <Card.Section p='lg'>
                {question.options.map((option, opIndex) =>
                    <Flex key={`AQCPO_${question.id}_${opIndex}`} gap='sm' >
                        <Text fw={isCorrect(opIndex) ? 700 : 300}>
                            {String.fromCharCode(97 + opIndex)}
                        </Text>
                        <Stack h='fit-content' gap={0}>
                            {splitText(option)?.map((portion, index) =>
                                <Text
                                    fw={isCorrect(opIndex) ? 700 : 300}
                                    key={`AQCPOP_${question.id}_${opIndex}_${index}`}
                                >
                                    {portion}
                                </Text>
                            )}
                        </Stack>
                    </Flex>
                )}
            </Card.Section>
        </Card>
    )
}





QuestionCard.propTypes = {
    item: PropTypes.object.isRequired,
    injection: PropTypes.object,
}

export default QuestionCard;