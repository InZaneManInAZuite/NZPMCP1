import ListFrame from "../../../Misc/ListFrame/ListFrame.jsx";
import {Card, Center, Paper} from "@mantine/core";
import {getAllEvents} from "../../../../services/event.services.js";
import EventCard from "./EventCard.jsx";
import EventForm from "./EventForm.jsx";
import { useContext, useEffect } from "react";
import UserContext from "../../../../context/UserContext.js";


const AdminMainEvents = () => {

    const { jwtToken, events, setEvents } = useContext(UserContext)

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

            <Center>
                <Card p='xl' radius='xl' mt='xl'  w='700px'>
                    <EventForm/>
                </Card>
            </Center>

        </Paper>
    )
}

export default AdminMainEvents