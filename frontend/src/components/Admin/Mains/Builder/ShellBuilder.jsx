import {AppShell, LoadingOverlay} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../../context/UserContext.js";
import {useNavigate} from "react-router-dom";
import {useDisclosure, useMediaQuery} from "@mantine/hooks";
import PropTypes from "prop-types";
import AsideBuilder from "./AsideBuilder.jsx";
import FooterFrame from "../../../Misc/Navigation/AppFrame/FooterFrame.jsx";
import NavBarFrame from "../../../Misc/Navigation/AppFrame/NavBarFrame.jsx";
import HeaderFrame from "../../../Misc/Navigation/AppFrame/HeaderFrame.jsx";



const ShellBuilder = ({children}) => {

    const { user } = useContext(UserContext);
    const [opened, { toggle }] = useDisclosure()
    const [ authorized, setAuthorized ] = useState(false)
    const navigate = useNavigate();
    const sideMatches = useMediaQuery('(min-width: 800px)')
    const navMatches = useMediaQuery('(min-width: 1250px)')


    useEffect (() => {
        if (user?.role === "ADMIN") {
            setAuthorized(true)
        } else {
            navigate('/');
        }
    }, [navigate]);

    const nav = '/admin'
    const label = 'Exit Builder'


    return (
        <AppShell
            padding={{
                base: 10,
                sm: 15,
                lg: 'xl'
            }}
            header={{
                height: 60,
            }}
            navbar={{
                width:'400px',
                breakpoint: '1250px',
                collapsed: { desktop: false, mobile: !opened }
            }}
            aside={{
                width:'400px',
                breakpoint: '800px',
                collapsed: { desktop: false, mobile: true }
            }}
            footer={{
                height: '100px',
                collapsed: !navMatches,
            }}
        >

            <AppShell.Header>
                <HeaderFrame navMatcher={navMatches} opened={opened} toggle={toggle}/>
            </AppShell.Header>


            {(authorized && user) ? (<>
                <AppShell.Navbar p='lg' zIndex={300}>
                    <NavBarFrame nav={nav} withNavFooter={!navMatches} label={label}>
                        <p>Navbar Temporary</p>
                    </NavBarFrame>
                </AppShell.Navbar>


                <AppShell.Main>
                    {children}
                    {!sideMatches && <AsideBuilder/>}
                </AppShell.Main>


                <AppShell.Aside>
                    <AsideBuilder/>
                </AppShell.Aside>


                <AppShell.Footer p='md'>
                    <FooterFrame nav={nav} label={label}/>
                </AppShell.Footer>
            </>) : (
                <LoadingOverlay/>
            )}
        </AppShell>
    )
}

ShellBuilder.propTypes = {
    children: PropTypes.element,
}

export default ShellBuilder;