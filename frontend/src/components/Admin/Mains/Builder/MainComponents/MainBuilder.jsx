import {Card, Divider, ScrollArea, Stack, Title} from "@mantine/core";
import {useContext} from "react";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import BuilderQuestionCard from "./BuilderQuestionCard.jsx";
import PropTypes from "prop-types";
import ListFrame from "../../../../Misc/ListFrame/ListFrame.jsx";
import QuestionSelectionCard from "../AsideComponents/QuestionSelectionCard.jsx";
import QuestionForm from "../../Questions/QuestionForm.jsx";
import {useMediaQuery} from "@mantine/hooks";
import AppShellContext from "../../../../../context/AppShellContext.js";


const MainBuilder = () => {

    const { competitionEdit, questionsEdit, questions } = useContext(CompetitionContext);
    const {appH, headH, mainH, footH, margin, sidePresentQ, navPresentQ} = useContext(AppShellContext);
    const matches = useMediaQuery('(min-width: 1400px)');


    return (
        <ScrollArea p='sm' h={navPresentQ ? mainH() : mainH() + footH} scrollbarSize={4}>
            <Stack align='center'>
                <Title order={2} mt='xl'>{competitionEdit ? competitionEdit?.title : `Select Competition`}</Title>
                <Divider w='80%' m='xl'/>

                {!questionsEdit?.length > 0 && (
                    <Title m='xl' order={4}>[ Please Add Questions ]</Title>
                )}

                {questionsEdit?.map((que, index) =>
                    <BuilderQuestionCard
                        question={que}
                        key={`MB_${competitionEdit.id}_BQC_${que.id}`}
                        index={index}
                    />
                )}

                <Divider w='80%' m='xl'/>

                {(competitionEdit && !(competitionEdit?.events?.length > 0)) && (<>
                    <Card p='xl' radius='xl' mt='xl'  w={matches ? '600px' : '100%'}>
                        <QuestionForm toAddEdit/>
                    </Card>
                </>)}




                {!sidePresentQ && (<>
                    <Divider w='80%' m='xl'/>
                    <ListFrame
                        height={appH - headH - margin}
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
        </ScrollArea>
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