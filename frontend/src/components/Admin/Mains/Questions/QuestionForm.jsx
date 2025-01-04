import {
    Title,
    Divider,
    TextInput,
    Button,
    Group, Text, UnstyledButton, Textarea, MultiSelect, Checkbox,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {useContext, useEffect, useState} from 'react'
import '@mantine/dates/styles.css'
import PropTypes from "prop-types";
import UserContext from "../../../../context/UserContext.js";
import {createQuestion, updateQuestion} from "../../../../services/question.services.js";
import {IconCheckbox, IconPlus, IconSquare, IconX} from "@tabler/icons-react";
import DifficultyComboBox from "./DifficultyComboBox.jsx";
import { v4 as uuidv4 } from 'uuid';

const QuestionForm = ({question, close, injection: data}) => {

    const { jwtToken } = useContext(UserContext);
    const [ changesPresent, setChangesPresent ] = useState(false);

    const [ diffCheck, setDiffCheck ] = useState(question?.difficulty || false);
    const [ topicCheck, setTopicCheck ] = useState(question?.topics.length > 0 || false);

    const handleTitleChange = (event) => form.setFieldValue('title', event.currentTarget.value);
    const handleOptionsChange = (event) => form.setFieldValue('options', () => {
        const index = event.currentTarget.getAttribute('indexer');
        const origOptions = form.values.options;
        origOptions[parseInt(index)] = event.currentTarget.value;
        return origOptions;
    });
    const handleAnswerChange = (event) => form.setFieldValue('answer', () => {
        const index = event.currentTarget.getAttribute('indexer');
        return parseInt(index);
    });
    const handleRemoveOption = (event) => form.setFieldValue('options', () => {
        const origOptions = form.values.options;
        if (origOptions?.length <= 1) {
            return origOptions
        }
        const index = event.currentTarget.getAttribute('indexer');
        return origOptions.filter((val, i) => parseInt(index) !== i);
    })
    const handleTopicChange = (event) => form.setFieldValue('topics', event);
    const onDiffClicked = () => {
        if (diffCheck) {
            form.setFieldValue('difficulty', undefined);
        }
        setDiffCheck(!diffCheck);
    }
    const onTopicClicked = () => {
        if (topicCheck) {
            form.setFieldValue('topics', []);
        }
        setTopicCheck(!topicCheck)
    }





    const form = useForm({
        initialValues: {
            title: question?.title,
            options: question?.options || [''],
            answer: question?.correctChoiceIndex,
            difficulty: question?.difficulty,
            topics: question?.topics,
        },
        validate: {
            title: (value) => {
                if (!value?.length > 0) {
                    return 'Question is required'
                }
            },
            options: (value) => {
                if (value === undefined || value.length <= 1) {
                    return 'Must be at least 2 options'
                } else if (value?.map(val => !val?.length > 0).includes(true)) {
                    return 'All options must be filled'
                }
            },
            answer: (value) => {
                if (value === undefined) {
                    return 'There must be an answer'
                } else if (form.values.options.length <= value) {
                    return 'There must be an answer'
                }
            },
            difficulty: (value) => {
                if (diffCheck) {
                    if (!value?.length > 0) {
                        return 'Pick tag or tick off'
                    }
                }
            },
            topics: (value) => {
                if (topicCheck) {
                    if (!value?.length > 0) {
                        return 'Pick tag/s or tick off'
                    }
                }
            }
        }
    });





    const getNewQue = () => {
        return {
            id: question?.id,
            title: form.values.title,
            options: form.values.options,
            correctChoiceIndex: form.values.answer,
            topics: form.values.topics,
            difficulty: form.values.difficulty,
        }
    }

    const getOldQue = () => {
        return {
            id: question?.id,
            title: question?.title,
            options: question?.options,
            correctChoiceIndex: question?.correctChoiceIndex,
            topics: question?.topics,
            difficulty: question?.difficulty,
        }
    }

    const clearFields = () => {
        form.setFieldValue('title', undefined);
        form.setFieldValue('options', undefined);
        form.setFieldValue('answer', undefined);
        form.setFieldValue('topics', []);
        form.setFieldValue('difficulty', undefined)
    }





    useEffect(() => {
        const newQue = getNewQue()
        const oldQue = getOldQue()
        setChangesPresent(JSON.stringify(newQue) !== JSON.stringify(oldQue))
    }, [question, form]);





    const handleCreate = () => {
        const newQue = {...getNewQue(), id: uuidv4()}
        createQuestion(newQue, jwtToken)
            .then(() => {
                data.setQuestions(data.questions.concat(newQue));
                clearFields();
            })
            .catch(e => console.log(e));
    }

    const handleUpdate = () => {
        const newQue = getNewQue()
        updateQuestion(newQue, jwtToken)
            .then(() => {
                clearFields();
                data.setQuestions(data.questions?.map(eachQue => {
                    if (eachQue.id === question.id) {
                        return newQue
                    } else {
                        return eachQue
                    }
                }));
                close();
            })
            .catch(e => console.log(e))
    }





    return (
        <>
            {(question) ? (
                <Title order={3}>Update Question</Title>
            ) : (
                <Title order={2}>Create New Question</Title>
            )}
            <Divider m='md'/>





            <form onSubmit={form.onSubmit(() => handleCreate())}>
                <Textarea
                    autosize
                    minRows={3}
                    label='Title'
                    placeholder='Enter question'
                    value={form.values.title || ''}
                    onChange={handleTitleChange}
                    error={form.errors.title}
                />
                <Divider m='lg' variant='dashed'/>





                <Checkbox
                    label='With Difficulty Tag'
                    checked={diffCheck}
                    onChange={onDiffClicked}
                />
                <DifficultyComboBox disabled={!diffCheck} form={form}/>
                <Checkbox
                    mt='xs'
                    label='With Topic Tag/s'
                    checked={topicCheck}
                    onChange={onTopicClicked}
                />
                <MultiSelect
                    disabled={!topicCheck}
                    label='Topics'
                    placeholder='Add topics'
                    value={form.values.topics || []}
                    onChange={handleTopicChange}
                    data={['Mechanics', 'Waves', 'Algebra', 'Geometry']}
                    w='60%'
                />
                <Divider m='lg' variant='dashed'/>





                <Text fw={500} size='sm' mb='2px'>Options</Text>
                {form.values.options?.map((option, index) => {
                    return (
                        <TextInput
                            error={form.errors.options || form.errors.answer}
                            key={`TI_${question?.id}${index}`}
                            indexer={index}
                            w='100%'
                            value={form.values.options[index]}
                            onChange={handleOptionsChange}
                            leftSection={form.values.answer === index ? <IconCheckbox/> : (
                                <UnstyledButton
                                    key={`UB_${question?.id}${index}`}
                                    indexer={index}
                                    onClick={handleAnswerChange}
                                >
                                    <IconSquare size='22px'/>
                                </UnstyledButton>
                            )}
                            rightSection={(
                                <UnstyledButton
                                    key={`UB_${question?.id}${index}`}
                                    indexer={index}
                                    onClick={handleRemoveOption}
                                >
                                    <IconX size='22px'/>
                                </UnstyledButton>
                            )}
                        />
                    )
                })}
                <Button
                    variant='default'
                    fullWidth
                    leftSection={<IconPlus />}
                    onClick={() => form.setFieldValue('options', () => {
                        return form.values.options?.concat(['']) || [''];
                    })}
                >
                    Add Option
                </Button>
                <Divider m='lg' variant='dashed'/>







                {(!question ? (
                    <Button mt='sm' w='100%' type='submit'>
                        Create Question
                    </Button>
                ) : (
                    <Group justify='center' mt='xl' gap='xl' grow>
                        <Button disabled={!changesPresent} onClick={() => {
                            handleUpdate();
                            close();
                        }}>
                            Save
                        </Button>

                        <Button onClick={() => {
                            clearFields();
                            close();
                        }}>
                            Cancel
                        </Button>
                    </Group>
                ))}
            </form>
        </>
    );
}





QuestionForm.propTypes = {
    question: PropTypes.object,
    close: PropTypes.func,
    injection: PropTypes.object,
}

export default QuestionForm