import LinkedNavBar from "./LinkedNavBar.jsx";
import {
    IconCalendarEvent,
    IconSettings,
    IconTriangle,
} from "@tabler/icons-react";
import PropTypes from "prop-types";

const navUser = [
    {link: `/events`, label: `Events`, icon: IconCalendarEvent},
    {link: `/attempts`, label: `Attempts`, icon: IconTriangle},
    {link: `/settings`, label: `Settings`, icon: IconSettings},
]

const NavBarUser = ({children, pageActive,

                         withAside = false,
                         asideComp,

                         withFooter = false,
                         footerComp
}) => {

    return (
        <LinkedNavBar navData={navUser}
                      pageActive={pageActive}

                      withAside={withAside}
                      asideComp={asideComp}

                      withFooter={withFooter}
                      footerComp={footerComp}
        >
            {children}
        </LinkedNavBar>
    )
}

NavBarUser.propTypes = {
    children: PropTypes.element,
    pageActive: PropTypes.string,
    withAside: PropTypes.bool,
    asideComp: PropTypes.element,
    withFooter: PropTypes.bool,
    footerComp: PropTypes.element,
}

export default NavBarUser