import {Button, Flex, LoadingOverlay, Stack, Title} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import {getEvent} from "../../../../services/event.services.js";
import AttemptContext from "../../../../context/AttemptContext.js";
import {useMediaQuery} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";
import LiveQuestionCard from "./LiveQuestionCard.jsx";
import {getAttemptScore, updateAttempt} from "../../../../services/attempt.services.js";
import UserContext from "../../../../context/UserContext.js";
import TimerAffix from "./TimerAffix.jsx";
import AppShellContext from "../../../../context/AppShellContext.js";

const MainLiveCompetition = () => {

    const { time } = useContext(AppShellContext)
    const { jwtToken } = useContext(UserContext);
    const { initiateLive, liveQuestions, liveEvent, liveCompetition, liveAttempt, clearLiveAttempt, attempts, setAttempts } = useContext(AttemptContext);
    const matches = useMediaQuery(`(min-width: 650px)`);
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);

    const [remaining, setRemaining] = useState('--:--:--')


    const {pathname} = window.location;


    useEffect(() => {
        if (liveEvent.endTime) {
            const duration = (Date.parse(liveEvent.endTime) - time)/1000

            if (duration <= 0) {
                handleSubmit()
            }

            const seconds = ((duration) % (60)).toString().padStart(2, '0');
            const minutes = (Math.floor(duration / 60) % 60).toString().padStart(2, '0');
            const hours = (Math.floor((duration) / (60*60))).toString().padStart(2, '0');

            setRemaining(`${hours}:${minutes}:${seconds}`);
        }
    }, [time]);

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





    const handleSubmit = () => {
        const newAttempt = {
            ...liveAttempt,
            endTime: Date.now()
        }
        updateAttempt(newAttempt, jwtToken)
            .then(() => {
                getAttemptScore(liveAttempt.id, jwtToken)
                    .then(scored => {

                        setAttempts(attempts?.map(a => {
                            if (a.id === liveAttempt.id) {
                                return scored;
                            } else {
                                return a;
                            }
                        }))

                        clearLiveAttempt();
                        navigate('/');
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }





    return(
        ((!authorized) ? (
            <LoadingOverlay/>
            ) :
            (<Flex align='center' direction='column'>
                <TimerAffix text={remaining}/>

                <Title mt='xl'>{liveEvent?.name || 'Competition'}</Title>
                <Title mb='xl' order={5}>{liveCompetition?.title}</Title>

                <Stack w={(matches) ? (650) : ('100%')}>
                    {liveQuestions?.map((question, qIndex) =>
                        <LiveQuestionCard
                            key={`MLC_${liveEvent.id}_QC_${question.id}_${qIndex}`}
                            question={question}
                            index={qIndex}
                        />
                    )}
                </Stack>


                <Button
                    m='xl'
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Flex>)
        )
    )
}

export default MainLiveCompetition