import PropTypes from "prop-types";
import {Card, Code, Divider, Modal, Stack, Text, Title} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import {getAllEventsOfUser} from "../../../../services/attendee.services.js";
import UserContext from "../../../../context/UserContext.js";
import ListFrame from "../../../Misc/ListFrame/ListFrame.jsx";
import JoinedEventCard from "./JoinedEventCard.jsx";

const UserInfo = ({user, opened, setOpened}) => {

    const { jwtToken } = useContext(UserContext);
    const [ events, setEvents ] = useState();




    const injection = {
        userId: user.id,
        userEmail: user.email,
        events, setEvents,
    }





    useEffect(() => {
        getAllEventsOfUser(user.id, jwtToken)
            .then(allEvents => {
                allEvents !== undefined &&
                setEvents(allEvents)
            })
            .catch(e => console.log(e.message))
    }, [user, jwtToken]);





    const setChecker = (item, checked) => {
        if (checked) {
            return true
        } else {
            return Date.now() < Date.parse(item.date)
        }
    }




    return(
        <Modal opened={opened} onClose={() => setOpened(false)} size='800px'>
            <Title order={2}>{user.name}</Title>
            <Divider mt='lg'/>





            <Stack gap='xs' p='sm'>
                <Text>Description:</Text>
                <Card>
                    <Text fw={700}>Email: {user.email}</Text>
                    <Text size='sm'>User ID: {user.id}</Text>

                    <Divider m='xs' mb='lg' variant='dashed' />
                    <Text>Role: <Code color='blue'>{user.role}</Code></Text>
                </Card>
                <Divider mb='sm' variant='dotted' />
            </Stack>





            <Text mb='sm'>Joined Events:</Text>
            <ListFrame
                width='100%'
                items={events}
                Component={JoinedEventCard}
                search={['name', 'description']}
                sort='date'
                setChecker={setChecker}
                checkBoxLabel='Include Previous Events'
                injection={injection}
            />
        </Modal>
    )
}

UserInfo.propTypes = {
    user: PropTypes.object,
    opened: PropTypes.bool,
    setOpened: PropTypes.func,
}

export default UserInfo