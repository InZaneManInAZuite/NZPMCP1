import {Button, Flex, LoadingOverlay, Stack, Title} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import {getEvent} from "../../../../services/event.services.js";
import AttemptContext from "../../../../context/AttemptContext.js";
import {useMediaQuery} from "@mantine/hooks";
import {useNavigate} from "react-router-dom";
import LiveQuestionCard from "./LiveQuestionCard.jsx";
import {updateAttempt} from "../../../../services/attempt.services.js";
import UserContext from "../../../../context/UserContext.js";
import TimerAffix from "./TimerAffix.jsx";
import {Client} from "@stomp/stompjs";

const MainLiveCompetition = () => {

    const { jwtToken } = useContext(UserContext);
    const { initiateLive, liveQuestions, liveEvent, liveCompetition, liveAttempt, clearLiveAttempt } = useContext(AttemptContext);
    const matches = useMediaQuery(`(min-width: 650px)`);
    const navigate = useNavigate();
    const [authorized, setAuthorized] = useState(false);

    const [connected, setConnected] = useState(false);
    const [time, setTime] = useState('--:--:--');


    const {pathname} = window.location;





    const stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws'
    })

    stompClient.onConnect = () => {
        if (!connected) {
            setConnected(true);
            stompClient.subscribe('/topic/timer', (timer) => {
                if (liveEvent.endTime) {
                    const duration = (Date.parse(liveEvent.endTime) - Date.parse(timer?.body.substring(1, 20)))/1000;

                    if (duration <= 0) {
                        handleSubmit();
                    }

                    const seconds = ((duration) % (60)).toString().padStart(2, '0');
                    const minutes = (Math.floor(duration / 60) % 60).toString().padStart(2, '0');
                    const hours = (Math.floor((duration) / (60*60))).toString().padStart(2, '0');

                    setTime(`${hours}:${minutes}:${seconds}`);
                }
            })
        }
    }

    stompClient.onDisconnect = () => {
        stompClient.unsubscribe('/topic/timer');
    }

    stompClient.onWebSocketError = (error) => {
        console.error(`Websocket Error: ${error}`);
    }

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    const connect = () => {
        if (!connected) {
            stompClient.activate();
        }
    }

    const disconnect = () => {

        stompClient.deactivate()
            .then(() => {
                setConnected(false)
                console.log('Disconnected')
            })
    }









    useEffect(() => {
        const splitUrl = pathname.split('/');
        const id = splitUrl[3];
        getEvent(id)
            .then(() => {
                initiateLive(navigate);
                setAuthorized(true);
                connect()
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
                disconnect();
                clearLiveAttempt();
                navigate('/');
            })
            .catch(e => console.log(e));
    }





    return(
        ((!authorized) ? (
            <LoadingOverlay/>
            ) :
            (<Flex align='center' direction='column'>
                <TimerAffix text={time}/>

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