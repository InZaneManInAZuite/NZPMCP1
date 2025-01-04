import {Stack,} from "@mantine/core";
import PropTypes from "prop-types";
import NavBarFooter from "../NavComponents/NavBarFooter.jsx";

const NavBarFrame = ({children, withNavFooter = true, label, nav,}) => {

    return (
        <Stack justify='space-between' h='100%'>
            <Stack gap='xs' >
                {children}
            </Stack>

            {withNavFooter && <NavBarFooter nav={nav} label={label}/>}
        </Stack>
    )
}

NavBarFrame.propTypes = {
    children: PropTypes.element,
    withNavFooter: PropTypes.bool,
    label: PropTypes.string,
    nav: PropTypes.string,
}

export default NavBarFrame;