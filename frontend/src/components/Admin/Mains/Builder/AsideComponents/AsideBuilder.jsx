import {useContext, useEffect} from "react";
import UserContext from "../../../../../context/UserContext.js";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import {ScrollArea, Stack} from "@mantine/core";
import ListFrame from "../../../../Misc/ListFrame/ListFrame.jsx";
import {getAllQuestions} from "../../../../../services/question.services.js";
import QuestionForm from "../../Questions/QuestionForm.jsx";
import QuestionSelectionCard from "./QuestionSelectionCard.jsx";


const AsideBuilder = ({w, h}) => {
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
        <ScrollArea
            pl='xs' pr='xs' pt='xs'
            scrollbarSize={4}
            w={w}
            h={h}
            type='always'>
            <Stack h='100%'>
                <ListFrame
                    height={h - 25}
                    width='100%'
                    items={questions || []}
                    Component={QuestionSelectionCard}
                    search='title'
                    NewForm={QuestionForm}
                    withForm
                    filter={{
                        difficulty: ['Easy', 'Medium', 'Hard'],
                        topics: ['Mechanics', 'Waves', 'Algebra','Geometry']
                    }}
                />
            </Stack>
        </ScrollArea>
    )
}

export default AsideBuilder