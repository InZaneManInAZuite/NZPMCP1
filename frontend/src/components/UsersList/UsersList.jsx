import { Card, ScrollArea } from '@mantine/core';
import {useContext, useEffect, useState} from 'react';
import classes from './UsersList.module.css';
import UserCard from '../UserCard/UserCard';
import { getAllUsers } from '../../services/user.services';
import UserContext from "../../context/UserContext.js";

const UsersList = () => {

    const [ users, setUsers ] = useState([]);
    const { jwtToken } = useContext(UserContext);

    useEffect(() => {
        getAllUsers(jwtToken)
            .then(allUsers  => {
                setUsers(allUsers);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <ScrollArea className={classes.scroll} scrollbars='y' type='scroll'>
            <Card>
            {users.map(user => ( <UserCard key={user.id} user={user} />))}
            </Card>
        </ScrollArea>
        
    )
}

export default UsersList;