import NavBar from "../NavBar/NavBar.jsx";
import {
    IconCalendarEvent,
    IconQuestionMark,
    IconSettings,
    IconTournament,
    IconTriangle,
    IconUsers,
    IconBlocks,
} from "@tabler/icons-react";
import PropTypes from "prop-types";

const navAdmin = [
    {link: `/admin/events`, label: `Events`, icon: IconCalendarEvent},
    {link: `/admin/users`, label: `Users`, icon: IconUsers},
    {link: `/admin/competitions`, label: `Competitions`, icon: IconTournament},
    {link: `/admin/attempts`, label: `Attempts`, icon: IconTriangle},
    {link: `/admin/questions`, label: `Questions`, icon: IconQuestionMark},
    {link: `/admin/settings`, label: `Settings`, icon: IconSettings},
    {link: `/admin/builder`, label: `Builder`, icon: IconBlocks}
]

const NavBarAdmin = ({children, pageActive,
                         withAside = false,
                         asideComp,

                         withFooter = false,
                         footerComp}) => {

    return (
        <NavBar navData={navAdmin}
                pageActive={pageActive}

                withAside={withAside}
                asideComp={asideComp}

                withFooter={withFooter}
                footerComp={footerComp}
        >
            {children}
        </NavBar>
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