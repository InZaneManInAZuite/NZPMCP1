import {Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

const NavigatorButton = ({w='200px', label, nav}) => {

    const navigate = useNavigate();

    return (
        <Button onClick={() => navigate(nav)} w={w}>
            {label}
        </Button>
    )
}

NavigatorButton.propTypes = {
    w: PropTypes.string,
    label: PropTypes.string.isRequired,
    nav: PropTypes.string.isRequired,
}

export default NavigatorButton