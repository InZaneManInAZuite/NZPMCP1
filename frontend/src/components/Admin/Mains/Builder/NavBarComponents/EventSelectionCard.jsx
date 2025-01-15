import {Anchor, Button, Card, Code, Group, Stack, Text} from "@mantine/core";
import {useContext, useState} from "react";
import PropTypes from "prop-types";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import EventInfo from "../../Events/EventInfo.jsx";


const EventSelectionCard = ({item: event}) => {

    const { competitionEdit, addCompetitionToEvent, removeCompetitionFromEvent, eventsEdit } = useContext(CompetitionContext);
    const [ infoOpened, setInfoOpened] = useState(false);





    const handleClick = () => {
        setInfoOpened(true);
    }

    const handleImplement = () => {
        const confirmed = confirm(`Note: are you sure you want "${competitionEdit.title}" to be the competition for "${event.name}"?`)
        if (confirmed) {
            addCompetitionToEvent(competitionEdit, event)
        }
    }

    const handleRemove = () => {
        const confirmed = confirm(`Warning: you are removing "${competitionEdit.title}" from "${event.name}" as its competition`)
        if (confirmed) {
            removeCompetitionFromEvent(competitionEdit, event);
        }
    }





    return(
        <Card w='100%' withBorder >
            {infoOpened && (
                <EventInfo event={event} opened={infoOpened} setOpened={setInfoOpened}/>
            )}

            <Stack direction='column' align='flex-end'>
                <Card p='xs' w='100%'>
                    <Group>
                        <Anchor
                            c={eventsEdit?.map(e => e.id).includes(event.id) ? 'green' : 'white'}
                            onClick={() => handleClick()}
                        >
                            <Text fw={700} align='left'>{event.name}</Text>
                        </Anchor>
                        {!!event.competitionId && (
                            <Code>Used</Code>
                        )}
                    </Group>
                </Card>

                <Text>{(new Date(event.date)).toDateString()}</Text>







                {(eventsEdit?.map(e => e.id).includes(event.id)) && (
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