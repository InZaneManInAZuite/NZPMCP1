import ListFrame from "../../../Misc/ListFrame/ListFrame.jsx";
import {Card, Center, Paper} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../../context/UserContext.js";
import {getAllQuestions} from "../../../../services/question.services.js";
import QuestionCard from "./QuestionCard.jsx";
import QuestionForm from "./QuestionForm.jsx";


const MainQuestions = () => {

    const { jwtToken } = useContext(UserContext)
    const [ questions, setQuestions ] = useState([])

    const injection = {
        questions, setQuestions,
    }

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
                injection={injection}
                filter={{
                    difficulty: ['Easy', 'Medium', 'Hard'],
                    topics: ['Mechanics', 'Waves', 'Algebra','Geometry']
                }}
            />

            <Center>
                <Card p='xl' radius='xl' mt='xl'  w='700px'>
                    <QuestionForm close={close} injection={injection}/>
                </Card>
            </Center>

        </Paper>
    )
}


export default MainQuestions