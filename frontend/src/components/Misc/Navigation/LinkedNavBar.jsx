import {useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {
    AppShell,
    Burger,
    Group,
    LoadingOverlay,
    NavLink,
    Paper,
    Text,
} from "@mantine/core";
import {useDisclosure, useMediaQuery} from "@mantine/hooks";
import UserContext from "../../../context/UserContext.js";
import PropTypes from "prop-types";
import NavBarFrame from "./AppFrame/NavBarFrame.jsx";





const LinkedNavBar = ({navData, children, pageActive,

                    withAside = false,
                    asideComp,

                    withFooter = false,
                    footerComp,

                    authorized = true,

                    withNavFooter = true,
                    label,
                    nav,
}) => {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [opened, { toggle }] = useDisclosure()
    const [active, setActive] = useState(pageActive);
    const matches = useMediaQuery(`(min-width: 750px)`);





    const links = navData.map((item) => (
        <NavLink leftSection={<item.icon />}
                 data-active={item.label === active || undefined}
                 key={item.label}
                 onClick={(event) => {
                     event.preventDefault();
                     setActive(item.label);
                     navigate(`${item.link}`)
                 }}
                 label={item.label}
        />
    ))





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
                width:300,
                breakpoint: '750px',
                collapsed: { desktop: false, mobile: !opened }
            }}
        >
            <AppShell.Header>
                <Group justify='space-between' p='sm'>
                    <Paper>
                        <Text size='xl' fw={700}>NZPMC</Text>
                    </Paper>
                    {!matches && (
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            size="sm"
                        />
                    )}
                </Group>
            </AppShell.Header>





            {(authorized && user) ? (<>
                <AppShell.Navbar p='lg'>
                    <NavBarFrame withNavFooter={withNavFooter} nav={nav} label={label}>
                        {links}
                    </NavBarFrame>
                </AppShell.Navbar>





                <AppShell.Main>
                    {children}
                </AppShell.Main>
            </>) : (
                <LoadingOverlay/>
            )}





            {withAside && (
                <AppShell.Aside>
                    {asideComp}
                </AppShell.Aside>
            )}





            {withFooter && (
                <AppShell.Footer>
                    {footerComp}
                </AppShell.Footer>
            )}
        </AppShell>
    );
}





LinkedNavBar.propTypes = {
    navData: PropTypes.array.isRequired,
    children: PropTypes.element,
    pageActive: PropTypes.string,
    withAside: PropTypes.bool,
    asideComp: PropTypes.element,
    withFooter: PropTypes.bool,
    footerComp: PropTypes.element,
    authorized: PropTypes.bool,
    label: PropTypes.string,
    nav: PropTypes.string,
    withNavFooter: PropTypes.bool,
}

export default LinkedNavBar;