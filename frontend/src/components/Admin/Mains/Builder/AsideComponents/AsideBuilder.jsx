import {useContext, useEffect} from "react";
import UserContext from "../../../../../context/UserContext.js";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import {ScrollArea, Stack} from "@mantine/core";
import ListFrame from "../../../../Misc/ListFrame/ListFrame.jsx";
import {getAllQuestions} from "../../../../../services/question.services.js";
import QuestionForm from "../../Questions/QuestionForm.jsx";
import QuestionSelectionCard from "./QuestionSelectionCard.jsx";
import AppShellContext from "../../../../../context/AppShellContext.js";


const AsideBuilder = () => {

    const { jwtToken } = useContext(UserContext);
    const { questions, setQuestions } = useContext(CompetitionContext);
    const { appH, headH, footH, margin } = useContext(AppShellContext);

    const asideH = () => (appH - headH - footH);

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
            w='100%'
            h={asideH()}
            type='always'>
            <Stack h='100%'>
                <ListFrame
                    height={asideH() - margin}
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