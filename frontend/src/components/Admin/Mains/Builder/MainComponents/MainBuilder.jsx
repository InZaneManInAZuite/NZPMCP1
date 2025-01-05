import {Card, Center, Divider, Paper, Stack, Title} from "@mantine/core";
import {useContext} from "react";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import BuilderQuestionCard from "./BuilderQuestionCard.jsx";
import PropTypes from "prop-types";
import ListFrame from "../../../../Misc/ListFrame/ListFrame.jsx";
import QuestionSelectionCard from "../AsideComponents/QuestionSelectionCard.jsx";
import QuestionForm from "../../Questions/QuestionForm.jsx";
import {useMediaQuery} from "@mantine/hooks";


const MainBuilder = ({w, injectW: data}) => {

    const { competitionEdit, questionsEdit, questions } = useContext(CompetitionContext);
    const sideMatches = useMediaQuery(`(min-width: ${data?.asideW + data?.mainW}px)`);
    const matches = useMediaQuery('(min-width: 1450px)');


    return (
        <Paper w={w} p='lg'>
            <Stack align='center'>
                <Title order={2}>{competitionEdit ? competitionEdit?.title : `Select Competition`}</Title>

                {questionsEdit.map((que, index) =>
                    <BuilderQuestionCard
                        question={que}
                        key={`MB_${competitionEdit.id}_BQC_${que.id}`}
                        index={index}
                    />
                )}

                <Divider w='80%' m='lg'/>

                {competitionEdit && (<>

                    <Card p='xl' radius='xl' mt='xl'  w={matches ? '600px' : '100%'}>
                        <QuestionForm toAddEdit/>
                    </Card>
                </>)}




                {!sideMatches && (<>
                    <Divider m='lg'/>
                    <ListFrame
                        height='600px'
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
                </>)}
            </Stack>
        </Paper>
    )
}

MainBuilder.propTypes = {
    w: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    injectW: PropTypes.object,
}

export default MainBuilder