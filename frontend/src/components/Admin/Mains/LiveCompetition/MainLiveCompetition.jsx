import {Button, Flex, LoadingOverlay, Paper, Stack, Title} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../../context/UserContext.js";
import {getEvent} from "../../../../services/event.services.js";
import AttemptContext from "../../../../context/AttemptContext.js";
import BuilderQuestionCard from "../Builder/MainComponents/BuilderQuestionCard.jsx";
import {useMediaQuery} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";

const MainLiveCompetition = () => {

    const { user } = useContext(UserContext);
    const { initiateLive, liveQuestions, liveEvent, liveCompetition } = useContext(AttemptContext);
    const matches = useMediaQuery(`(min-width: 650px)`);
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false)

    const {pathname} = window.location;


    useEffect(() => {
        const splitUrl = pathname.split('/');
        const id = splitUrl[3];
        getEvent(id)
            .then(() => {
                initiateLive(navigate);
                setAuthorized(true);
            })
            .catch(e => console.log(e));

    }, []);



    return(
        ((!authorized) ? (
            <LoadingOverlay/>
            ) :
            (<Flex align='center' direction='column'>

                <Title mt='xl'>{liveEvent?.name || 'Competition'}</Title>
                <Title mb='xl' order={5}>{liveCompetition?.title}</Title>

                <Stack w={(matches) ? (650) : ('100%')}>
                    {liveQuestions?.map((question, qIndex) =>
                        <BuilderQuestionCard
                            key={`MLC_${liveEvent.id}_QC_${question.id}_${qIndex}`}
                            question={question}
                        />
                    )}
                </Stack>


                <Button
                    m='xl'
                >
                    Submit
                </Button>
            </Flex>)
        )
    )
}

export default MainLiveCompetition