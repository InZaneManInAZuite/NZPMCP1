import ListFrame from "../../../Misc/ListFrame/ListFrame.jsx";
import {Card, Center, Paper} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../../context/UserContext.js";
import {getAllUsers} from "../../../../services/user.services.js";
import UserCard from "./UserCard.jsx";
import UserForm from "./UserForm.jsx";


const AdminMainUsers = () => {

    const { jwtToken } = useContext(UserContext)
    const [ users, setUsers ] = useState([])

    const injection = {
        users: users,
        setUsers: setUsers,

    }

    useEffect(() => {
        getAllUsers(jwtToken)
            .then(allUsers => {
                setUsers(allUsers)
            })
            .catch(e => console.log(e.message))
    }, [jwtToken])

    const setChecker = (item, checked) => {
        if (checked) {
            return true
        } else {
            return item.role !== 'ADMIN'
        }
    }

    return (
        <Paper>
            <ListFrame
                items={users}
                Component={UserCard}
                search={['name', 'email']}
                setChecker={setChecker}
                checkBoxLabel='Include Admins'
                injection={injection}
            />

            <Center>
                <Card p='xl' radius='xl' mt='xl'  w='700px'>
                    <UserForm close={close} injection={injection}/>
                </Card>
            </Center>

        </Paper>
    )
}

export default AdminMainUsers