import {useContext} from "react";
import UserContext from "../../../../context/UserContext.js";
import {Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import NavigatorButton from "./NavigatorButton.jsx";

const LogoutButton = ({w='200px'}) => {

    const { handleUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        handleUser(undefined)
        navigate('/');
    }

    return (
        <Button onClick={handleLogout} w={w}>
            Logout
        </Button>
    )
}

NavigatorButton.propTypes = {
    w: PropTypes.string,
}

export default LogoutButton