import {Anchor, Button, Card, Code, Flex, Group, Stack, Text} from "@mantine/core";
import {useContext, useState} from "react";
import UserContext from "../../../../../context/UserContext.js";
import PropTypes from "prop-types";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import EventInfo from "../../Events/EventInfo.jsx";
import {updateCompetition} from "../../../../../services/competition.services.js";
import {updateEvent} from "../../../../../services/event.services.js";


const EventSelectionCard = ({item: event}) => {

    const { jwtToken, events } = useContext(UserContext);
    const { competitionEdit, setCompetitionEdit, questions, setQuestionsEdit, eventsEdit, setEventsEdit } = useContext(CompetitionContext);
    const [ infoOpened, setInfoOpened] = useState(false);





    const handleClick = () => {
        setInfoOpened(true);
    }

    const handleImplement = () => {
        const confirmed = confirm(`Note: are you sure you want "${competitionEdit.title}" to be the competition for "${event.name}"?`)

    }

    const handleRemove = () => {
        const confirmed = confirm(`Warning: you are removing "${competitionEdit.title}" from "${event.name}" as its competition`)

    }




    const eventUsesCompetition = () => (!!event.competitionId === competitionEdit?.id);





    return(
        <Card w='100%' withBorder >
            {infoOpened && (
                <EventInfo event={event} opened={infoOpened} setOpened={setInfoOpened}/>
            )}

            <Stack direction='column' align='flex-end'>
                <Card p='xs' w='100%'>
                    <Group>
                        <Anchor
                            c={eventUsesCompetition() ? 'green' : 'white'}
                            onClick={() => handleClick()}
                        >
                            <Text fw={700} align='left'>{event.name}</Text>
                        </Anchor>

                    </Group>
                </Card>




                {!!event.competitionId && (
                    <Code>Used</Code>
                )}





                {eventUsesCompetition() && (
                    <Button
                        color='red'
                        onClick={handleRemove}
                        w='fit-content'
                    >
                        Remove
                    </Button>
                )}
                {competitionEdit && !event.competitionId && (
                    <Button
                        onClick={handleImplement}
                        w='fit-content'
                    >
                        Implement
                    </Button>
                )}
            </Stack>
        </Card>
    )
}

EventSelectionCard.propTypes = {
    item: PropTypes.object.isRequired,
}

export default EventSelectionCard