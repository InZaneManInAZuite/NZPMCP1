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
import AppShellContext from "../../../../context/AppShellContext.js";

const nav = '/admin';
const label = 'Exit Builder';

const ShellBuilder = () => {

    const { user } = useContext(UserContext);
    const { clearEdit } = useContext(CompetitionContext);
    const { appH, appW, headH, navW, asideW, footH, minMainW,
        navBreak, sideBreak, navPresentQ  } = useContext(AppShellContext);
    const [opened, { toggle }] = useDisclosure();
    const [ authorized, setAuthorized ] = useState(false);
    const navigate = useNavigate();

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
            navbar={{width: navW, breakpoint: navBreak(), collapsed: { mobile: !opened }}}
            aside={{width: asideW, breakpoint: sideBreak(), collapsed: { desktop: false, mobile: true }}}
            footer={{height: footH, collapsed: !navPresentQ}}
        >

            <AppShell.Header>
                <HeaderFrame opened={opened} toggle={toggle}/>
            </AppShell.Header>


            {(authorized && user) ? (<>
                <AppShell.Navbar zIndex={225}>
                    <NavBarFrame nav={nav} withNavFooter={!navPresentQ} label={label}>
                        <NavBarBuilder w='100%' />
                    </NavBarFrame>
                </AppShell.Navbar>




                <AppShell.Main>
                    <MainBuilder/>
                </AppShell.Main>


                <AppShell.Aside>
                    <AsideBuilder/>
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