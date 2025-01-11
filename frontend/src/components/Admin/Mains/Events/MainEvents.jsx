import ListFrame from "../../../Misc/ListFrame/ListFrame.jsx";
import {Button, Card, Center, Paper, Text} from "@mantine/core";
import {getAllEvents} from "../../../../services/event.services.js";
import EventCard from "./EventCard.jsx";
import EventForm from "./EventForm.jsx";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../../context/UserContext.js";
import {Client} from "@stomp/stompjs"


const MainEvents = () => {

    const { jwtToken, events, setEvents, user } = useContext(UserContext)

    const [ connected, setConnected] = useState(false)
    const [ time, setTime ] = useState('00:00:00');

    const stompClient = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        reconnectDelay: 1000
    })

    stompClient.onConnect = (frame) => {
        setConnected(true);
        console.log(`Connected: ${frame}`);
        stompClient.subscribe('/topic/timer', (timer) => {
            setTime(timer?.body);
        })
    }

    stompClient.onWebSocketError = (error) => {
        console.error(`Websocket Error: ${error}`);
    }

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };





    const connect = () => {
        stompClient.activate();
    }

    const disconnect = () => {
        stompClient.deactivate()
            .then(() => {
                setConnected(false);
                console.log('Disconnected')
            })
    }














    useEffect(() => {
        getAllEvents(jwtToken)
            .then(allEvents => {
                setEvents(allEvents)
            })
            .catch(e => console.log(e.message))
    }, [jwtToken])

    const setChecker = (item, checked) => {
        if (checked) {
            return true
        } else {
            return Date.now() < Date.parse(item.date)
        }
    }

    return (
        <Paper>
            <ListFrame
                items={events}
                Component={EventCard}
                search={['name', 'description']}
                sort='date'
                setChecker={setChecker}
                checkBoxLabel='Include Previous Events'
            />

            {(user?.role === 'ADMIN') && (
                <Center>
                    <Card p='xl' radius='xl' mt='xl'  w='700px'>
                        <EventForm/>
                    </Card>
                </Center>
            )}


            <Button onClick={connect} disabled={connected}>
                Connect
            </Button>
            <Button onClick={disconnect} disabled={!connected}>
                Disconnect
            </Button>
            <Text>{time}</Text>
        </Paper>
    )
}

export default MainEvents