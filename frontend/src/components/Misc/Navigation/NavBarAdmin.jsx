import LinkedNavBar from "./LinkedNavBar.jsx";
import {
    IconCalendarEvent,
    IconQuestionMark,
    IconSettings,
    IconTournament,
    IconUsers,
    IconBlocks, IconClipboardData,
} from "@tabler/icons-react";
import PropTypes from "prop-types";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../context/UserContext.js";
import {useNavigate} from "react-router-dom";

const navAdmin = [
    {link: `/admin/events`, label: `Events`, icon: IconCalendarEvent},
    {link: `/admin/users`, label: `Users`, icon: IconUsers},
    {link: `/admin/competitions`, label: `Competitions`, icon: IconTournament},
    {link: `/admin/questions`, label: `Questions`, icon: IconQuestionMark},
    {link: `/admin/settings`, label: `Settings`, icon: IconSettings},
    {link: `/admin/reports`, label:`Reports`, icon: IconClipboardData},
    {link: `/builder`, label: `Builder`, icon: IconBlocks},
]

const NavBarAdmin = ({children, pageActive,

                         withAside = false,
                         asideComp,

                         withFooter = false,
                         footerComp
}) => {

    const { user } = useContext(UserContext)
    const [ authorized, setAuthorized ] = useState(false)
    const navigate = useNavigate()

    useEffect (() => {
        if (user?.role === "ADMIN") {
            setAuthorized(true)
        } else {
            navigate('/');
        }
    }, [navigate]);

    return (
        <LinkedNavBar navData={navAdmin}
                      pageActive={pageActive}

                      withAside={withAside}
                      asideComp={asideComp}

                      withFooter={withFooter}
                      footerComp={footerComp}

                      authorized={authorized}
        >
            {children}
        </LinkedNavBar>
    )
}

NavBarAdmin.propTypes = {
    children: PropTypes.element,
    pageActive: PropTypes.string,
    withAside: PropTypes.bool,
    asideComp: PropTypes.element,
    withFooter: PropTypes.bool,
    footerComp: PropTypes.element,
}

export default NavBarAdmin