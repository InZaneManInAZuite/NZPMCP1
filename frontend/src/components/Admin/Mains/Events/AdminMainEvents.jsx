import ListFrame from "../../../ListFrame/ListFrame.jsx";
import {Paper} from "@mantine/core";
import {getAllEvents} from "../../../../services/event.services.js";
import EventsCard from "./EventsCard.jsx";
import CreateEventForm from "./CreateEventForm.jsx";
import {useContext, useEffect} from "react";
import UserContext from "../../../../context/UserContext.js";


const AdminMainEvents = () => {

    const { jwtToken, events, setEvents } = useContext(UserContext)

    useEffect(() => {
        const fetchData = async () => {
            const allItems = await getAllEvents(jwtToken)
            setEvents(allItems)
        }
        fetchData()
    }, [jwtToken])

    const setChecker = (item) => {
        return Date.now() < Date.parse(item.date)
    }

    return (
        <Paper>
            <ListFrame
                items={events}
                Component={EventsCard}
                search={['name', 'email']}
                sort={'date'}
                setChecker={setChecker}
                checkBoxLabel='Include Previous Events'
            />

            <CreateEventForm/>
        </Paper>
    )
}

export default AdminMainEvents