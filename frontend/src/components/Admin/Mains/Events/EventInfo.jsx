import PropTypes from "prop-types";
import {Card, Checkbox, Divider, Flex, Group, Modal, Stack, Text, Title} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import {getAllAttendeesForEvent} from "../../../../services/attendee.services.js";
import UserContext from "../../../../context/UserContext.js";
import ListFrame from "../../../ListFrame/ListFrame.jsx";
import UserCard from "../../../UserCard/UserCard.jsx";
import {getAllEvents} from "../../../../services/event.services.js";

const EventInfo = ({event, opened, setOpened}) => {

    const { jwtToken } = useContext(UserContext);
    const [ users, setUsers ] = useState();

    const handleClose = () => {
        setOpened(false)
    }

    const setChecker = (item) => {
        return item.role !== "ADMIN"
    }

    useEffect(() => {
        getAllAttendeesForEvent(event.id, jwtToken)
            .then(attendees => setUsers(attendees))
            .catch(e => console.log(e.message))
    }, [event, jwtToken]);


    return(
        <Modal opened={opened} onClose={handleClose} size='800px'>
            <Title order={2}>{event.name}</Title>





            <Divider m='xl'/>
            <Card>
                <Card.Section p='xl' withBorder>
                    <Text>Description:</Text>
                    <Text>{event.description}</Text>
                </Card.Section>





                <Card.Section p='xl' withBorder>
                    <Text>Date: {new Date(event.date).toDateString()}</Text>

                    {event.start && (
                        <Group>
                            <Text>When: {event.start}</Text>
                            {event.end && (
                                <Text>{` - ${event.end}`}</Text>
                            )}
                        </Group>
                    )}

                    {event.location && (<Text>Where: {event.location}</Text>)}
                </Card.Section>





                <Card.Section>
                    <ListFrame
                        items={users}
                        component={UserCard}
                        search={['name', 'email']}
                        setChecker={setChecker}
                        checkBoxLabel='Include Admins'
                    />

                </Card.Section>



            </Card>




        </Modal>
    )

}

EventInfo.propTypes = {
    event: PropTypes.object,
    opened: PropTypes.bool,
    setOpened: PropTypes.func,
}

export default EventInfo