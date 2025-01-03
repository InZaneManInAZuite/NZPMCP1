import {Card, Group, LoadingOverlay, ScrollArea, Text, TextInput} from '@mantine/core';
import {useContext, useEffect, useState} from 'react';
import classes from './QuestionsList.module.css';
import QuestionCard from '../QuestionCard/QuestionCard.jsx';
import { getAllQuestions } from '../../../../../services/question.services.js';
import UserContext from "../../../../../context/UserContext.js";

const QuestionsList = () => {

    const [ questions, setQuestions ] = useState([]);
    const { jwtToken } = useContext(UserContext);
    const [ filtered, setFiltered ] = useState(questions);
    const [ searching, setSearching ] = useState('');

    useEffect(() => {
        getAllQuestions(jwtToken)
            .then(allQuestions  => {
                setQuestions(allQuestions);
            })
            .catch(err => console.log(err));
    }, [jwtToken])

    useEffect(() => {
        const f = questions.filter(question => {
            return question.title?.toLowerCase().includes(searching.toLowerCase());
        })
        setFiltered(f.sort((a,b) => a.title.localeCompare(b.title)))
    }, [ searching, questions ]);

    const onSearchChange = (event) => setSearching(event.currentTarget.value)

    if (!filtered) {
        return (
            <LoadingOverlay/>
        )
    }

    return (
        <Card className={classes.layout} radius='md'>
            <Card.Section className={classes.bar} withBorder>
                <Group>
                    <Text>Search:</Text>
                    <TextInput
                        placeholder='Look for a question'
                        value={searching}
                        onChange={onSearchChange}
                    />
                </Group>
            </Card.Section>

            <Card.Section withBorder>
                <ScrollArea className={classes.scroll} scrollbars='y' type='scroll'>
                    <Card>
                        {filtered.map(question => ( <QuestionCard key={question.title} question={question} />))}
                    </Card>
                </ScrollArea>
            </Card.Section>
        </Card>
    )
}

export default QuestionsList;