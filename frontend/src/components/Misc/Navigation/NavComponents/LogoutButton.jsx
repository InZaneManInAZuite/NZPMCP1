import {useContext} from "react";
import UserContext from "../../../../context/UserContext.js";
import {Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import CompetitionContext from "../../../../context/CompetitionContext.js";
import AttemptContext from "../../../../context/AttemptContext.js";

const LogoutButton = ({w='200px'}) => {

    const { handleUser } = useContext(UserContext);
    const { clearEdit } = useContext(CompetitionContext);
    const { clearAttempts } = useContext(AttemptContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        handleUser(undefined);
        clearEdit();
        clearAttempts();
        navigate('/');
    }

    return (
        <Button onClick={handleLogout} w={w}>
            Logout
        </Button>
    )
}

LogoutButton.propTypes = {
    w: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ])
}

export default LogoutButton