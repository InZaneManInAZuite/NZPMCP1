import {AppShell, LoadingOverlay, ScrollArea} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../../context/UserContext.js";
import {useNavigate} from "react-router-dom";
import {useDisclosure, useMediaQuery, useViewportSize} from "@mantine/hooks";
import PropTypes from "prop-types";
import AsideBuilder from "./AsideBuilder.jsx";
import FooterFrame from "../../../Misc/Navigation/AppFrame/FooterFrame.jsx";
import NavBarFrame from "../../../Misc/Navigation/AppFrame/NavBarFrame.jsx";
import HeaderFrame from "../../../Misc/Navigation/AppFrame/HeaderFrame.jsx";
import NavBarBuilder from "./NavBarComponents/NavBarBuilder.jsx";

const nav = '/admin';
const label = 'Exit Builder';
const navW = 400;
const asideW = 400;
const mainW = 400;
const headH = 60;
const footH = 100;

const ShellBuilder = ({children}) => {

    const { user } = useContext(UserContext);
    const [opened, { toggle }] = useDisclosure();
    const [ authorized, setAuthorized ] = useState(false);
    const navigate = useNavigate();

    const sideMatches = useMediaQuery(`(min-width: ${asideW + mainW}px)`);
    const navMatches = useMediaQuery(`(min-width: ${navW + asideW + mainW}px)`);
    const {height: appH, width: appW} = useViewportSize();

    const navStackCollapsed = (appH - 200 - headH);
    const navStackOpened = (appH - footH - headH);

    useEffect (() => {
        if (user?.role === "ADMIN") {
            setAuthorized(true)
        } else {
            navigate('/');
        }
    }, [navigate]);




    return (
        <AppShell
            header={{height: headH,}}
            navbar={{width: navW, breakpoint: navW + mainW + asideW, collapsed: { desktop: false, mobile: !opened }}}
            aside={{width: asideW, breakpoint: mainW + asideW, collapsed: { desktop: false, mobile: true }}}
            footer={{height: footH, collapsed: !navMatches}}
        >

            <AppShell.Header>
                <HeaderFrame navMatcher={navMatches} opened={opened} toggle={toggle}/>
            </AppShell.Header>


            {(authorized && user) ? (<>
                <AppShell.Navbar zIndex={300}>
                    <NavBarFrame nav={nav} withNavFooter={!navMatches} label={label}>
                        <NavBarBuilder w='100%' h={navMatches ? navStackOpened : navStackCollapsed} />
                    </NavBarFrame>
                </AppShell.Navbar>


                <AppShell.Main p='lg'>
                    {children}
                    {!sideMatches && <AsideBuilder/>}
                </AppShell.Main>


                <AppShell.Aside p='lg'>
                    <AsideBuilder/>
                </AppShell.Aside>


                <AppShell.Footer p='md' zIndex={400}>
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