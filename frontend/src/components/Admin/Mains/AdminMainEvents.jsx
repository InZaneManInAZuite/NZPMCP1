import ListFrame from "../../ListFrame/ListFrame.jsx";
import {Paper} from "@mantine/core";
import {getAllEvents} from "../../../services/event.services.js";
import EventsCard from "../../EventsCard/EventsCard.jsx";
import CreateEventForm from "./CreateEventForm/CreateEventForm.jsx";


const AdminMainEvents = () => {

    const setChecker = (item) => {
        return Date.now() < Date.parse(item.date)
    }

    return (
        <Paper>
            <ListFrame
                getAllFunc={getAllEvents}
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