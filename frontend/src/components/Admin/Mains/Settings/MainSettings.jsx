import {Card, Center, Paper} from "@mantine/core";
import {useContext, useState} from "react";
import UserContext from "../../../../context/UserContext.js";
import UserForm from "../Users/UserForm.jsx";


const MainSettings = () => {

    const { user } = useContext(UserContext);
    const [ users, setUsers ] = useState([])

    const injection = {
        users: users,
        setUsers: setUsers,

    }

    return (
        <Paper>
            <Center>
                <Card p='xl' radius='xl' mt='xl'  w='700px'>
                    <UserForm user={user} close={close} injection={injection}/>
                </Card>
            </Center>

        </Paper>
    )
}

export default MainSettings