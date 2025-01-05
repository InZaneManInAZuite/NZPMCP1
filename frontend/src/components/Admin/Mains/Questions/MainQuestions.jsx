import ListFrame from "../../../Misc/ListFrame/ListFrame.jsx";
import {Card, Center, Paper} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../../context/UserContext.js";
import {getAllQuestions} from "../../../../services/question.services.js";
import QuestionCard from "./QuestionCard.jsx";
import QuestionForm from "./QuestionForm.jsx";
import CompetitionContext from "../../../../context/CompetitionContext.js";


const MainQuestions = () => {

    const { jwtToken } = useContext(UserContext);
    const { questions, setQuestions } = useContext(CompetitionContext);

    useEffect(() => {
        getAllQuestions(jwtToken)
            .then(allQues => {
                setQuestions(allQues)
            })
            .catch(e => console.log(e))
    }, [jwtToken])

    return (
        <Paper>
            <ListFrame
                items={questions || []}
                Component={QuestionCard}
                search='title'
                filter={{
                    difficulty: ['Easy', 'Medium', 'Hard'],
                    topics: ['Mechanics', 'Waves', 'Algebra','Geometry']
                }}
            />

            <Center>
                <Card p='xl' radius='xl' mt='xl'  w='700px'>
                    <QuestionForm/>
                </Card>
            </Center>

        </Paper>
    )
}


export default MainQuestions