import {Button, Card, Group, Stack, Text, Title} from "@mantine/core";
import {IconX} from "@tabler/icons-react";
import PropTypes from "prop-types";
import {removeAttendeeFromEvent} from "../../../../services/attendee.services.js";
import {useContext, useState, useEffect} from "react";
import UserContext from "../../../../context/UserContext.js";


const JoinedEventCard = ({item: event, injection: data}) => {

    const { jwtToken } = useContext(UserContext);
    const [ pastTheDate, setPastTheDate ] = useState(true)

    const handleRemove = () => {
        const confirmed = confirm(`Are you sure you want to remove ${data.userEmail} from attendees?`);
        if (confirmed) {
            removeAttendeeFromEvent(event.id, data.userId, jwtToken)
                .then(() => {
                    const updatedEvents = data.events.filter(e => e.id !== event.id);
                    data.setEvents(updatedEvents);
                })
                .catch(e => console.log(e.message));
        }
    }


    useEffect(() => {
        if (Date.now() < Date.parse(event.date)) {
            setPastTheDate(false);
        }
    }, []);





    return (
        <Card w='100%' h='250px' withBorder>
            <Group w='100%' h='100%' justify='space-between'>
                <Card p='xl' w={pastTheDate ? '100%' : '75%'} h='100%'>
                    <Card.Section h='60%' p='md'>
                        <Title lineClamp={2} align='left' order={2}>{event.name}</Title>
                    </Card.Section>

                    <Card.Section p='md'>
                        <Text lineClamp={3}>{new Date(event.date).toDateString()} - {event.description}</Text>
                    </Card.Section>
                </Card>





                {(!pastTheDate) && (
                    <Stack h='100%' justify='center' w='fit-content'>
                        <Button
                            w='125px'
                            variant='filled'
                            color='red'
                            justify='space-between'
                            rightSection={<IconX size='15px' />}
                            leftSection={<span/>}
                            onClick={handleRemove}
                        >
                            Remove
                        </Button>
                    </Stack>
                )}
            </Group>
        </Card>
    );
};

JoinedEventCard.propTypes = {
    item: PropTypes.object.isRequired,
    injection: PropTypes.object,
};

export default JoinedEventCard