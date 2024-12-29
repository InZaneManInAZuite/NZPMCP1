import {Card, Checkbox, Group, LoadingOverlay, ScrollArea, Text, TextInput} from '@mantine/core';
import {useContext, useEffect, useState} from 'react';
import classes from './UsersList.module.css';
import UserCard from '../UserCard/UserCard';
import { getAllUsers } from '../../services/user.services';
import UserContext from "../../context/UserContext.js";

const UsersList = () => {

    const [ users, setUsers ] = useState([]);
    const { jwtToken } = useContext(UserContext);
    const [ filtered, setFiltered ] = useState(users);
    const [ checked, setChecked ] = useState(false);
    const [ searching, setSearching ] = useState('');

    useEffect(() => {
        getAllUsers(jwtToken)
            .then(allUsers  => {
                setUsers(allUsers);
            })
            .catch(err => console.log(err));
    }, [jwtToken])

    useEffect(() => {
        const f = users.filter(user => {
            return user.name?.toLowerCase().includes(searching.toLowerCase()) &&
                (checked || user.role !== 'ADMIN');
        })
        setFiltered(f.sort((a,b) => a.name.localeCompare(b.name)))
    }, [ searching, checked, users ]);

    const onSearchChange = (event) => setSearching(event.currentTarget.value)
    const onCheckChange = (event) => setChecked(event.currentTarget.checked)

    if (!filtered) {
        return (
            <LoadingOverlay/>
        )
    }

    return (
        <Card className={classes.layout} radius='md'>
            <Card.Section className={classes.bar} withBorder>
                <Group>
                    <Text>Search:</Text>
                    <TextInput
                        placeholder='Look for a user'
                        value={searching}
                        onChange={onSearchChange}
                    />
                    <Checkbox
                        labelPosition='left'
                        label="Include Admins"
                        checked={checked}
                        onChange={onCheckChange}
                    />
                </Group>
            </Card.Section>

            <Card.Section withBorder>
                <ScrollArea className={classes.scroll} scrollbars='y' type='scroll'>
                    <Card className={classes.eventsList}>
                        {filtered.map(user => ( <UserCard key={user.id} item={user} />))}
                    </Card>
                </ScrollArea>
            </Card.Section>
        </Card>
    )
}

export default UsersList;