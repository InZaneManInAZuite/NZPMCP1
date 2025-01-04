import {Anchor, Card, Code, Flex, Group, Modal, Text, UnstyledButton} from "@mantine/core";
import CompetitionForm from "../../Competitions/CompetitionForm.jsx";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {useContext, useState} from "react";
import UserContext from "../../../../../context/UserContext.js";
import {removeCompetition} from "../../../../../services/competition.services.js";
import PropTypes from "prop-types";
import CompetitionContext from "../../../../../context/CompetitionContext.js";


const CompetitionSelectionCard = ({item: competition}) => {

    const { jwtToken } = useContext(UserContext);
    const { competitions, setCompetitions, setCompetitionEdit } = useState(CompetitionContext);
    const [ updateOpened, setUpdateOpened] = useState(false);


    const handleToBuild = () => {
        console.log(competitions)
        setCompetitionEdit(competition);
    }

    const handleDelete = () => {
        const confirmed = confirm(`Warning you are removing ${competition.title}`)
        if (confirmed) {
            removeCompetition(competition.id, jwtToken)
                .then(() => {
                    setCompetitions(competitions.filter(eachCompete => eachCompete.id !== competition.id));
                })
                .catch(e => console.log(e));
        }
    }


    return(
        <Card w='100%' withBorder>
            {updateOpened && (
                <Modal opened={updateOpened} onClose={() => setUpdateOpened(false)} size='800px' zIndex={400}>
                    <CompetitionForm competition={competition} close={() => setUpdateOpened(false)} injection={injection}/>
                </Modal>
            )}

            <Flex direction={{base: 'column', sm: 'row'}} justify='flex-end'>
                <Card p='sm' w='100%'>
                    <Group>
                        <Anchor c='white' onClick={() => handleToBuild()}>
                            <Text lineClamp={1} align='left'>{competition.title}</Text>
                        </Anchor>
                        {competition.events?.length > 0 &&
                            <Code color='blue'>Used: {competition.events.length}</Code>
                        }
                    </Group>
                </Card>





                <Flex gap='xs'>
                    <UnstyledButton onClick={() => setUpdateOpened(true)}>
                        <IconEdit size='20px'/>
                    </UnstyledButton>
                    <UnstyledButton onClick={handleDelete}>
                        <IconTrash size='20px'/>
                    </UnstyledButton>
                </Flex>
            </Flex>
        </Card>
    )
}

CompetitionSelectionCard.propTypes = {
    item: PropTypes.object.isRequired,
}

export default CompetitionSelectionCard