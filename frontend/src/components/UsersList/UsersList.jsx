import { Card, ScrollArea } from '@mantine/core';
import { useState } from 'react';
import classes from './UsersList.module.css';
import UserCard from '../UserCard/UserCard';
import { getAllUsers } from '../../services/user.services';

const UsersList = () => {

    const [ users, setUsers ] = useState([]);

    getAllUsers()
        .then(allUsers => {
            setUsers(allUsers);
        })
        .catch(err => console.log(err));

    return (
        <ScrollArea className={classes.scroll} scrollbars='y' type='scroll'>
            <Card className={classes.eventsList}>
            {users.map(user => ( <UserCard key={user.id} user={user} />))}
            </Card>
        </ScrollArea>
        
    )
}

export default UsersList;