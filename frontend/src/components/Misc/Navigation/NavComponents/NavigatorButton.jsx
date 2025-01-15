import {Button} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

const NavigatorButton = ({w='200px', label, nav, linkFunc}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        if (linkFunc !== undefined) {
            linkFunc();
        }
        navigate(nav);
    }

    return (
        <Button onClick={handleClick} w={w}>
            {label}
        </Button>
    )
}

NavigatorButton.propTypes = {
    w: PropTypes.string,
    label: PropTypes.string.isRequired,
    nav: PropTypes.string.isRequired,
    linkFunc: PropTypes.func,
}

export default NavigatorButton