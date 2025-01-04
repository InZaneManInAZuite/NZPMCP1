import {Card, Title, Text, UnstyledButton, Modal, Anchor, Group, Code, Flex} from '@mantine/core';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {removeUser} from "../../../../services/user.services.js";
import UserContext from "../../../../context/UserContext.js";
import UserForm from "./UserForm.jsx";
import UserInfo from "./UserInfo.jsx";

const UserCard = ({ item: user, injection: data }) => {

    const { jwtToken } = useContext(UserContext);
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
                    <UserForm user={user} close={handleUpdateClose} injection={data}/>
                </Modal>
            )}

            {infoOpened && (
                <UserInfo user={user} opened={infoOpened} setOpened={setInfoOpened}/>
            )}




            <Flex direction={{base: 'column', sm: 'row'}} justify='flex-end'>
                <Card p='sm' w='100%' h='100px'>
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
                        <Text lineClamp={1}>{user.email} - {user.id}</Text>
                    </Card.Section>
                </Card>




                {(user) && (
                    <Flex gap='sm'>
                        <UnstyledButton onClick={handleUpdateOpen}>
                            <IconEdit size='35px'/>
                        </UnstyledButton>
                        <UnstyledButton onClick={handleDelete}>
                            <IconTrash size='35px'/>
                        </UnstyledButton>
                    </Flex>
                )}
            </Flex>
        </Card>
    )
}





UserCard.propTypes = {
    item: PropTypes.object.isRequired,
    injection: PropTypes.object,
}

export default UserCard;