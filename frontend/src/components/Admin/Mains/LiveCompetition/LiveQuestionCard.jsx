import PropTypes from "prop-types";
import {Card, Checkbox, Code, Divider, Flex, Group, Stack, Text, Title} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import {useMediaQuery} from "@mantine/hooks";
import AttemptContext from "../../../../context/AttemptContext.js";


const LiveQuestionCard = ({question,  index: qIndex}) => {

    const { editAnswer, liveAnswers } = useContext(AttemptContext);
    const matches = useMediaQuery('(min-width: 1600px)');
    const [ optionIndex, setOptionIndex ] = useState(undefined);

    useEffect(() => {
        const qstIndex = liveAnswers?.map(ans => ans.questionId).indexOf(question.id);
        if (qstIndex !== -1) {
            setOptionIndex(liveAnswers[qstIndex]?.answerIndex)
        }
    }, [liveAnswers]);







    const handleChoose = (opIndex) => {
        editAnswer(question.id, opIndex);
    }

    const splitText = (textToSplit) => {
        return textToSplit?.split('\n');
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
                            <Checkbox
                                indexer={opIndex}
                                checked={(opIndex === optionIndex)}
                                onChange={() => handleChoose(opIndex)}
                            />
                            <Stack h='fit-content' gap={0}>
                                {splitText(option)?.map((portion, index) =>
                                    <Text
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
        </Card>
    )
}




LiveQuestionCard.propTypes = {
    question: PropTypes.object.isRequired,
    index: PropTypes.number,
}

export default LiveQuestionCard