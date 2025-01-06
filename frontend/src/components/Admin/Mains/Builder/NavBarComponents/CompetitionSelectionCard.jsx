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
    const { competitions, setCompetitions, competitionEdit, setCompetitionEdit, questions, setQuestionsEdit } = useContext(CompetitionContext);
    const [ updateOpened, setUpdateOpened] = useState(false);


    const handleClick = () => {
        setCompetitionEdit(competition);
        setQuestionsEdit(competition.questionIds?.map(qId => questions.find(q => q.id === qId)));
    }

    const handleDelete = () => {
        const confirmed = confirm(`Warning you are removing "${competition.title}"`)
        if (confirmed) {
            removeCompetition(competition.id, jwtToken)
                .then(() => {
                    if (competitionEdit?.id === competition?.id) {
                        setCompetitionEdit(undefined)
                    }
                    setCompetitions(competitions.filter(eachCompete => eachCompete.id !== competition.id));
                })
                .catch(e => console.log(e));
        }
    }


    return(
        <Card w='100%' withBorder >
            {updateOpened && (
                <Modal opened={updateOpened} onClose={() => setUpdateOpened(false)} size='800px' zIndex={400}>
                    <CompetitionForm competition={competition} close={() => setUpdateOpened(false)}/>
                </Modal>
            )}

            <Flex direction={{base: 'column', sm: 'row'}} justify='flex-end'>
                <Card p='xs' w='100%'>
                    <Group>
                        <Anchor
                            c={competition?.id === competitionEdit?.id ? 'blue' : 'white'}
                            onClick={() => handleClick()}
                        >
                            <Text align='left'>{competition.title}</Text>
                        </Anchor>
                        {competition.events?.length > 0 &&
                            <Code color='blue'>Used: {competition.events.length}</Code>
                        }
                    </Group>
                </Card>





                {!competition.events?.length > 0 && (
                    <Flex gap='xs'>
                        <UnstyledButton onClick={() => setUpdateOpened(true)}>
                            <IconEdit size='20px'/>
                        </UnstyledButton>
                        <UnstyledButton onClick={handleDelete}>
                            <IconTrash size='20px'/>
                        </UnstyledButton>
                    </Flex>
                )}
            </Flex>
        </Card>
    )
}

CompetitionSelectionCard.propTypes = {
    item: PropTypes.object.isRequired,
}

export default CompetitionSelectionCard