import classes from './NavBar.module.css';
import {
    IconCalendarEvent,
    IconUsers,
    IconTournament,
    IconTriangle,
    IconQuestionMark,
    IconSettings,
    IconUserFilled,
    IconMail,
    IconLogout,
} from '@tabler/icons-react';
import {useContext, useEffect, useState} from 'react';
import UserContext from "../../context/UserContext.js";
import { useNavigate } from "react-router-dom";

const data = [
    {link: `/admin/events`, label: `Events`, icon: IconCalendarEvent},
    {link: `/admin/users`, label: `Users`, icon: IconUsers},
    {link: `/admin/competitions`, label: `Competitions`, icon: IconTournament},
    {link: `/admin/attempts`, label: `Attempts`, icon: IconTriangle},
    {link: `/admin/questions`, label: `Questions`, icon: IconQuestionMark},
    {link: `/admin/settings`, label: `Settings`, icon: IconSettings},
]

const NavBar = () => {

    const [active, setActive] = useState(`Users`);
    const { user, handleUser, isLogged } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {

    }, [isLogged]);

    const links = data.map((item) => (
        <a className={classes.link}
        data-active={item.label === active || undefined}
        key={item.label}
        onClick={(event) => {
            event.preventDefault();
            setActive(item.label);
        }}>
            <item.icon className={classes.linkIcon} stroke={1.5}></item.icon>
            <span>{item.label}</span>
        </a>
    ))

    const handleSwitch = (link) => {
        navigate(link);
    }

    const handleLogout = () => {
        document.cookie = 'email=; path=/; SameSite=Strict; secure; HttpOnly'
        document.cookie = 'password=; path=/; SameSite=Strict; secure; HttpOnly'
        handleUser(null)
        navigate("/");
    }

    if (!isLogged) {
        return(
            <div>
                <p>LOGGED OFF</p>
            </div>
        )
    }


    return (<nav className={classes.navbar}>
        <div className={classes.navbarMain}>
            {links}
        </div>

        <div className={classes.footer}>
            <a className={classes.link}>
                <IconMail className={classes.linkIcon} stroke={1.5}/>
                <span>user.email</span>
            </a>
            <a className={classes.link}>
                <IconUserFilled className={classes.linkIcon} stroke={1.5}/>
                <span>user.email</span>
            </a>
            <a className={classes.link}>
                <IconLogout className={classes.linkIcon} stroke={1.5}/>
                <span>user.email</span>
            </a>
        </div>


    </nav>)
}

export default NavBar