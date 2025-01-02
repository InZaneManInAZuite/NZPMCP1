import {Card, Title, Text, UnstyledButton, Modal, Anchor, Stack, Group, Code} from '@mantine/core';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {removeUser} from "../../services/user.services.js";
import UserContext from "../../context/UserContext.js";
import EventForm from "../Admin/Mains/Events/EventForm.jsx";
import EventInfo from "../Admin/Mains/Events/EventInfo.jsx";

const UserCard = ({ item: user, injection: data }) => {

    const { isLogged, jwtToken } = useContext(UserContext);
    const [ updateOpened, setUpdateOpened] = useState(false);
    const [ infoOpened, setInfoOpened] = useState(false)





    const handleUpdateClose = () => {
        setUpdateOpened(false)
    }

    const handleUpdateOpen = () => {
        setUpdateOpened(true)
    }





    const handleTitle = () => {
        setInfoOpened(true)
    }

    const handleDelete = () => {
        const confirmed = confirm(`Warning you are removing ${user.email}`)
        if (confirmed) {
            removeUser(user.id, jwtToken)
                .then(() => {
                    data.setUsers(data.users.filter(eachUser => eachUser.id !== user.id));
                })
                .catch((err) => console.log(err));
        }
    }





    return (
        <Card w='100%' withBorder>
            {updateOpened && (
                <Modal opened={updateOpened} onClose={handleUpdateClose} size='800px'>
                    <EventForm user={user} close={handleUpdateClose}/>
                </Modal>
            )}

            {infoOpened && (
                <EventInfo user={user} opened={infoOpened} setOpened={setInfoOpened}/>
            )}




            <Group w='100%' justify='space-between'>
                <Card p='sm' w='fit-content'>
                    <Card.Section h='60%' p='sm'>
                        <Group>
                            <Anchor c='white' onClick={handleTitle}>
                                <Title lineClamp={1} align='left' order={2}>{user.name}</Title>
                            </Anchor>
                            {user.role !== 'USER' &&
                                <Code color='blue'>{user.role}</Code>
                            }
                        </Group>
                    </Card.Section>

                    <Card.Section p='sm'>
                        <Text lineClamp={3}>{user.email} - {user.id}</Text>
                    </Card.Section>
                </Card>




                {(isLogged) && (
                    <Stack h='100%' justify='center' w='fit-content'>
                            <Group  w='100%' gap='md' justify='center'>
                                <UnstyledButton onClick={handleUpdateOpen}>
                                    <IconEdit size='35px'/>
                                </UnstyledButton>
                                <UnstyledButton onClick={handleDelete}>
                                    <IconTrash size='35px'/>
                                </UnstyledButton>
                            </Group>
                    </Stack>
                )}
            </Group>
        </Card>
    )
}





UserCard.propTypes = {
    item: PropTypes.object.isRequired,
    injection: PropTypes.object,
}

export default UserCard;