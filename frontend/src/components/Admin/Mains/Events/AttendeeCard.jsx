import {Button, Card, Code, Group, Stack, Text, Title} from "@mantine/core";
import {IconX} from "@tabler/icons-react";
import PropTypes from "prop-types";
import {removeAttendeeFromEvent} from "../../../../services/attendee.services.js";
import {useContext} from "react";
import UserContext from "../../../../context/UserContext.js";


const AttendeeCard = ({item: user, injection: data}) => {

    const { jwtToken, user: loggedInUser } = useContext(UserContext);

    const handleRemove = () => {
        const confirmed = confirm(`Are you sure you want to remove ${user.email} from attendees?`);
        if (confirmed) {
            removeAttendeeFromEvent(data.eventId, user.id, jwtToken)
                .then(() => {
                    const updatedAttendees = data.attendees.filter(attendee => attendee.id !== user.id);
                    data.setAttendees(updatedAttendees);
                })
                .catch(e => console.log(e.message));
        }
    }





    return (
        <Card w='100%' withBorder>
            <Group w='100%' justify='space-between'>
                <Card p='sm' w='fit-content'>
                    <Card.Section h='60%' p='sm'>
                        <Group>
                            <Title align='left' order={3}>{user.name}</Title>
                            {user.role !== 'USER' &&
                                <Code color='blue'>{user.role}</Code>
                            }
                        </Group>
                    </Card.Section>

                    <Card.Section p='sm'>
                        <Text lineClamp={3}>{user.email} - {user.id}</Text>
                    </Card.Section>
                </Card>





                {(user.id !== loggedInUser.id) && (
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

AttendeeCard.propTypes = {
    item: PropTypes.object.isRequired,
    injection: PropTypes.object,
};

export default AttendeeCard