import {Card, Title, UnstyledButton, Modal, Group, Code, Flex, Text} from '@mantine/core';
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
                        <Group>
                            <Title align='left' order={4}>{question.title}</Title>
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
                {question.options.map((option, index) => {
                    let fw = 300;
                    if (index === question.correctChoiceIndex) {
                        fw = 700;
                    }
                    return (
                        <Group key={`QCO_${question.id}_${index}`}>
                            <Text  fw={fw}>
                                {String.fromCharCode(97 + index)} - {option}
                            </Text>
                        </Group>
                    )
                })}
            </Card.Section>
        </Card>
    )
}





QuestionCard.propTypes = {
    item: PropTypes.object.isRequired,
    injection: PropTypes.object,
}

export default QuestionCard;