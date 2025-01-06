import {ScrollArea, Stack} from "@mantine/core";
import ListFrame from "../../../../Misc/ListFrame/ListFrame.jsx";
import {useContext, useEffect} from "react";
import UserContext from "../../../../../context/UserContext.js";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import AppShellContext from "../../../../../context/AppShellContext.js";
import PropTypes from "prop-types";
import {getAllEvents} from "../../../../../services/event.services.js";
import EventSelectionCard from "./EventSelectionCard.jsx";
import EventForm from "../../Events/EventForm.jsx";


const EventsBuilderTab = ({h}) => {

    const { jwtToken, events, setEvents, } = useContext(UserContext);
    const { margin } = useContext(AppShellContext);

    useEffect(() => {
        getAllEvents()
            .then(allEvents => {
                setEvents(allEvents);
            })
            .catch(e => console.log(e))
    }, [jwtToken, setEvents])

    const setChecker = (item, checked) => {
        if (checked) {
            return true;
        } else {
            return Date.parse(item.date) > Date.now();
        }
    }

    return (
        <ScrollArea
            pl='xs' pr='xs' pt='xs'
            scrollbarSize={4}
            w='100%'
            h={h}
            type='always'>
            <Stack h='100%'>
                <ListFrame
                    height={h - margin}
                    width='100%'
                    items={events || []}
                    Component={EventSelectionCard}
                    search={['name', 'description']}
                    sort='date'
                    setChecker={setChecker}
                    checkBoxLabel='Include Previous'
                    NewForm={EventForm}
                    withForm
                />
            </Stack>
        </ScrollArea>
    )
}

EventsBuilderTab.propTypes = {
    h: PropTypes.number,
}

export default EventsBuilderTab;