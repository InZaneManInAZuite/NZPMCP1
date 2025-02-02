import {Anchor, Card, Code, Flex, Group, Modal, Stack, Text, UnstyledButton} from "@mantine/core";
import {IconCopy, IconEdit, IconMinus, IconPlus, IconTrash} from "@tabler/icons-react";
import {useContext, useState} from "react";
import UserContext from "../../../../../context/UserContext.js";
import PropTypes from "prop-types";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import QuestionForm from "../../Questions/QuestionForm.jsx";
import {createQuestion, removeQuestion} from "../../../../../services/question.services.js";
import QuestionInfo from "./QuestionInfo.jsx";
import { v4 as uuidv4 } from 'uuid';


const QuestionSelectionCard = ({item: question}) => {

    const { jwtToken } = useContext(UserContext);
    const { questions, setQuestions, questionsEdit, competitionEdit,
         addQuestionToCompetition, removeQuestionFromCompetition} = useContext(CompetitionContext);
    const [ updateOpened, setUpdateOpened] = useState(false);
    const [ infoOpened, setInfoOpened ] = useState(false);





    const splitText = (textToSplit) => {
        return textToSplit.split('\n');
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

    const handleAdd = () => {
        addQuestionToCompetition(question, competitionEdit);
    }

    const handleRemove = () => {
        removeQuestionFromCompetition(question, competitionEdit);
    }

    const handleCopy = () => {
        const newQue = {
            ...question,
            id: uuidv4(),
        };
        createQuestion(newQue, jwtToken)
            .then(() => {
                setQuestions(questions.concat(newQue));
            })
            .catch(e => console.log(e));
    }


    return(
        <Card w='100%' withBorder >
            {updateOpened && (
                <Modal opened={updateOpened} onClose={() => setUpdateOpened(false)} size='800px' zIndex={275}>
                    <QuestionForm question={question} close={() => setUpdateOpened(false)}/>
                </Modal>
            )}
            {infoOpened && (
                <QuestionInfo question={question} opened={infoOpened} setOpened={setInfoOpened}/>
            )}

            <Flex direction='column' >
                <Card p='xs' w='100%'>
                    <Group>
                        <Anchor
                            c={questionsEdit?.map(que => que.id).includes(question.id) ? 'green' : 'white'}
                            onClick={() => setInfoOpened(true)}
                        >
                            {splitText(question.title).map((portion, index) =>
                                <Text mb='xs' fw={600} ta='left' key={`QSCT_${question.id}_${index}`}>
                                    {portion}
                                </Text>
                            )}
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





                    <Stack gap={0} mt='xs'>
                        {splitText(question.options[parseInt(question.correctChoiceIndex)]).map((portion, index) =>
                            <Text size='xs' fw={100} key={`QSCO_${question.id}_${index}`}>{portion}</Text>
                        )}
                    </Stack>
                </Card>





                <Flex gap='xs' justify='flex-end'>
                    {(competitionEdit && !(competitionEdit?.events?.length > 0)) && (
                        ((questionsEdit?.map(que => que.id).includes(question.id)) ? (
                            <UnstyledButton onClick={handleRemove}>
                                <IconMinus size='20px'/>
                            </UnstyledButton>
                        ) : (
                            <UnstyledButton onClick={handleAdd}>
                                <IconPlus size='20px'/>
                            </UnstyledButton>
                        ))
                    )}
                    <UnstyledButton onClick={handleCopy}>
                        <IconCopy size='20px' />
                    </UnstyledButton>
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