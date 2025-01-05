import {useContext} from "react";
import UserContext from "../../../../../context/UserContext.js";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import {Button, Card, Divider, Group, Modal, Stack, Text, Title} from "@mantine/core";
import PropTypes from "prop-types";
import {updateCompetition} from "../../../../../services/competition.services.js";


const QuestionInfo = ({question, opened, setOpened}) => {

    const { jwtToken } = useContext(UserContext);
    const { questionsEdit, setQuestionsEdit, competitionEdit } = useContext(CompetitionContext);





    const splitText = (textToSplit) => {
        return textToSplit.split('\n');
    }

    const isCorrect = (index) => {
        return question.correctChoiceIndex === index;
    }

    const handleAdd = () => {
        const newQues = questionsEdit?.concat(question) || [question];
        const newCompete = {
            ...competitionEdit,
            questionIds: newQues.map(que => que.id),
        };
        updateCompetition(newCompete, jwtToken)
            .then(() => {
                setQuestionsEdit(questionsEdit.concat(question));
                setOpened(false);
            })
            .catch(e => console.log(e));
    }

    const handleRemove = () => {
        const newQues = questionsEdit.filter(que => que.id !== question.id);
        const newCompete = {
            ...competitionEdit,
            questionIds: newQues.map(que => que.id),
        };
        updateCompetition(newCompete, jwtToken)
            .then(() => {
                setQuestionsEdit(newQues)
                setOpened(false);
            })
            .catch(e => console.log(e))
    }





    return(
        <Modal opened={opened} onClose={() => setOpened(false)} size='800px' zIndex={275}>
            <Stack gap='xs' p='sm'>
                {splitText(question.title).map((portion, index) => (
                    <Title ta='left' order={4} mb='sm' key={`QIT_${question.id}_${index}`} >{portion}</Title>
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
                                {splitText(option).map((portion, index) =>
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





            {(questionsEdit?.map(que => que.id).includes(question.id)) ? (
                <Button
                    w='100%'
                    onClick={handleRemove}
                >
                    Remove
                </Button>
            ) : (
                <Button
                    w='100%'
                    onClick={handleAdd}
                >
                    Add
                </Button>
            )}
        </Modal>
    )
}

QuestionInfo.propTypes = {
    question: PropTypes.object,
    opened: PropTypes.bool,
    setOpened: PropTypes.func,
}

export default QuestionInfo