import {Card, Title, UnstyledButton, Modal, Anchor, Group, Code, Flex} from '@mantine/core';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import {IconEdit, IconTrash} from "@tabler/icons-react";
import UserContext from "../../../../context/UserContext.js";
import {removeCompetition} from "../../../../services/competition.services.js";
import CompetitionForm from "./CompetitionForm.jsx";
import {useNavigate} from "react-router-dom";

const UserCard = ({ item: competition, injection: data }) => {

    const { jwtToken } = useContext(UserContext);
    const [ updateOpened, setUpdateOpened] = useState(false);
    const navigate = useNavigate()





    const handleToBuild = () => {
        navigate('/builder')
    }

    const handleDelete = () => {
        const confirmed = confirm(`Warning you are removing ${competition.title}`)
        if (confirmed) {
            removeCompetition(competition.id, jwtToken)
                .then(() => {
                    data.setCompetitions(data.competitions.filter(eachCompete => eachCompete.id !== competition.id));
                })
                .catch(e => console.log(e));
        }
    }





    return (
        <Card w='100%' withBorder>
            {updateOpened && (
                <Modal opened={updateOpened} onClose={() => setUpdateOpened(false)} size='800px'>
                    <CompetitionForm competition={competition} close={() => setUpdateOpened(false)} injection={data}/>
                </Modal>
            )}




            <Flex direction={{base: 'column', sm: 'row'}} justify='flex-end'>
                <Card p='sm' w='100%' h='100px'>
                    <Group>
                        <Anchor c='white' onClick={() => handleToBuild()}>
                            <Title lineClamp={1} align='left' order={2}>{competition.title}</Title>
                        </Anchor>
                        {competition.events?.length > 0 &&
                            <Code color='blue'>Used: {competition.events.length}</Code>
                        }
                    </Group>
                </Card>





                <Flex gap='sm'>
                    <UnstyledButton onClick={() => setUpdateOpened(true)}>
                        <IconEdit size='35px'/>
                    </UnstyledButton>
                    <UnstyledButton onClick={handleDelete}>
                        <IconTrash size='35px'/>
                    </UnstyledButton>
                </Flex>
            </Flex>
        </Card>
    )
}





UserCard.propTypes = {
    item: PropTypes.object.isRequired,
    injection: PropTypes.object,
}

export default UserCard;