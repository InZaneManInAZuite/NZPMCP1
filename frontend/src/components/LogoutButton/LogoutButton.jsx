import {useContext} from "react";
import UserContext from "../../context/UserContext.js";
import {Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {

    const { handleUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        handleUser(undefined)
        navigate('/');
    }

    return (
        <Button onClick={handleLogout}>
            Logout
        </Button>
    )
}

export default LogoutButton