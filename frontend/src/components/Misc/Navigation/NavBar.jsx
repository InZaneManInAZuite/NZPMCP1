import {useEffect, useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {
    Anchor,
    AppShell,
    Burger,
    Card, Code,
    Divider,
    Group,
    LoadingOverlay,
    NavLink,
    Paper,
    Stack,
    Text, Title
} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import classes from "./NavBar.module.css";
import UserContext from "../../../context/UserContext.js";
import PropTypes from "prop-types";
import LogoutButton from "./LogoutButton.jsx";





const NavBar = ({navData, children, pageActive,

                    withAside = false,
                    asideComp,

                    withFooter = false,
                    footerComp,

                    authorized = true
}) => {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [opened, { toggle }] = useDisclosure()
    const [active, setActive] = useState(pageActive);





    const links = navData.map((item) => (
        <NavLink leftSection={<item.icon />}
                 data-active={item.label === active || undefined}
                 key={item.label}
                 onClick={(event) => {
                     event.preventDefault();
                     setActive(item.label);
                     navigate(`/admin/${item.label.toLowerCase()}`)
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
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        size="sm"
                        className={classes.burger}
                    />
                </Group>
            </AppShell.Header>





            {(authorized && user) ? (<>
                <AppShell.Navbar p='lg'>
                    <Stack justify='space-between' h='100%'>
                        <Stack gap='xs' >
                            {links}
                        </Stack>
                        <Stack>
                            <Divider/>
                            <Card>
                                <Group>
                                    <Title order={2} >{user.name}</Title>
                                    {user.role !== 'USER' && (
                                        <Code color='blue' w='fit-content'>{user.role}</Code>
                                    )}
                                </Group>
                                <Anchor c='gray' underline='never' ta='left' mb='lg'>{user.email}</Anchor>
                                <LogoutButton/>
                            </Card>
                        </Stack>
                    </Stack>
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





NavBar.propTypes = {
    navData: PropTypes.array.isRequired,
    children: PropTypes.element,
    pageActive: PropTypes.string,
    withAside: PropTypes.bool,
    asideComp: PropTypes.element,
    withFooter: PropTypes.bool,
    footerComp: PropTypes.element,
    authorized: PropTypes.bool,
}

export default NavBar;