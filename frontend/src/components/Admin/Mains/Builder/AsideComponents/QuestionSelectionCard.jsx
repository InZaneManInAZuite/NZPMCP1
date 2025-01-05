import {Anchor, Card, Code, Flex, Group, Modal, Text, UnstyledButton} from "@mantine/core";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {useContext, useState} from "react";
import UserContext from "../../../../../context/UserContext.js";
import PropTypes from "prop-types";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import QuestionForm from "../../Questions/QuestionForm.jsx";
import {removeQuestion} from "../../../../../services/question.services.js";


const QuestionSelectionCard = ({item: question}) => {

    const { jwtToken } = useContext(UserContext);
    const { questions, setQuestions, questionsEdit, competitionEdit, setCompetitionEdit } = useContext(CompetitionContext);
    const [ updateOpened, setUpdateOpened] = useState(false);


    const handleClick = () => {

    }

    const handleDelete = () => {
        const confirmed = confirm(`Warning you are removing "${question.title}"`)
        if (confirmed) {
            removeQuestion(question.id, jwtToken)
                .then(() => {
                    setQuestions(questions.filter(eachQue => eachQue.id !== question.id));
                })
                .catch(e => console.log(e));
        }
    }


    return(
        <Card w='100%' withBorder >
            {updateOpened && (
                <Modal opened={updateOpened} onClose={() => setUpdateOpened(false)} size='800px' zIndex={275}>
                    <QuestionForm question={question} close={() => setUpdateOpened(false)}/>
                </Modal>
            )}

            <Flex direction='column' >
                <Card p='xs' w='100%'>
                    <Group>
                        <Anchor
                            c={questionsEdit?.includes(question.id) ? 'blue' : 'white'}
                            onClick={() => handleClick()}
                        >
                            <Text align='left'>{question.title}</Text>
                        </Anchor>
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




                    <Text mt='xs' fw={700}>{question.options[parseInt(question.correctChoiceIndex)]}</Text>
                </Card>





                <Flex gap='xs' justify='flex-end'>
                    <UnstyledButton onClick={() => setUpdateOpened(true)}>
                        <IconEdit size='20px'/>
                    </UnstyledButton>
                    <UnstyledButton onClick={handleDelete}>
                        <IconTrash size='20px'/>
                    </UnstyledButton>
                </Flex>
            </Flex>
        </Card>
    )
}

QuestionSelectionCard.propTypes = {
    item: PropTypes.object.isRequired,
}

export default QuestionSelectionCard