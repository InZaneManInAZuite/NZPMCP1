import {AppShell, LoadingOverlay} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../../context/UserContext.js";
import {useNavigate} from "react-router-dom";
import {useDisclosure, useMediaQuery, useViewportSize} from "@mantine/hooks";
import AsideBuilder from "./AsideComponents/AsideBuilder.jsx";
import FooterFrame from "../../../Misc/Navigation/AppFrame/FooterFrame.jsx";
import NavBarFrame from "../../../Misc/Navigation/AppFrame/NavBarFrame.jsx";
import HeaderFrame from "../../../Misc/Navigation/AppFrame/HeaderFrame.jsx";
import NavBarBuilder from "./NavBarComponents/NavBarBuilder.jsx";
import MainBuilder from "./MainComponents/MainBuilder.jsx";
import CompetitionContext from "../../../../context/CompetitionContext.js";

const nav = '/admin';
const label = 'Exit Builder';
const navW = 400;
const asideW = 400;
const mainW = 400;
const headH = 60;
const footH = 100;

const ShellBuilder = () => {

    const { user } = useContext(UserContext);
    const { clearEdit } = useContext(CompetitionContext);
    const [opened, { toggle }] = useDisclosure();
    const [ authorized, setAuthorized ] = useState(false);
    const navigate = useNavigate();

    const navMatches = useMediaQuery(`(min-width: ${navW + asideW + mainW}px)`);
    const {height: appH, width: appW} = useViewportSize();

    const navStackCollapsed = (appH - 200 - headH);
    const navStackOpened = (appH - footH - headH);

    const injectW = {
        navW, asideW, mainW, appW, footH
    }

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
            navbar={{width: navW, breakpoint: navW + mainW + asideW, collapsed: { mobile: !opened }}}
            aside={{width: asideW, breakpoint: mainW + asideW, collapsed: { desktop: false, mobile: true }}}
            footer={{height: footH, collapsed: !navMatches}}
        >

            <AppShell.Header>
                <HeaderFrame navMatcher={navMatches} opened={opened} toggle={toggle}/>
            </AppShell.Header>


            {(authorized && user) ? (<>
                <AppShell.Navbar zIndex={225}>
                    <NavBarFrame nav={nav} withNavFooter={!navMatches} label={label}>
                        <NavBarBuilder w='100%' h={navMatches ? navStackOpened : navStackCollapsed} />
                    </NavBarFrame>
                </AppShell.Navbar>




                <AppShell.Main>
                    <MainBuilder injectW={injectW}/>
                </AppShell.Main>


                <AppShell.Aside>
                    <AsideBuilder w={asideW} h={navStackOpened}/>
                </AppShell.Aside>


                <AppShell.Footer p='md' zIndex={250}>
                    <FooterFrame nav={nav} label={label} linkFunc={clearEdit}/>
                </AppShell.Footer>
            </>) : (
                <LoadingOverlay/>
            )}
        </AppShell>
    )
}

export default ShellBuilder;