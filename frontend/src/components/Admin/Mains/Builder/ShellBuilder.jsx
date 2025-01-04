import {
    Anchor,
    AppShell,
    Burger,
    Card,
    Code,
    Divider,
    Group,
    LoadingOverlay,
    Paper,
    Stack,
    Text,
    Title
} from "@mantine/core";
import classes from "./Builder.module.css";
import LogoutButton from "../../../Misc/Navigation/LogoutButton.jsx";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../../context/UserContext.js";
import {useNavigate} from "react-router-dom";
import {useDisclosure, useMediaQuery} from "@mantine/hooks";
import PropTypes from "prop-types";
import AsideBuilder from "./AsideBuilder.jsx";



const ShellBuilder = ({children}) => {

    const { user } = useContext(UserContext);
    const [opened, { toggle }] = useDisclosure()
    const [ authorized, setAuthorized ] = useState(false)
    const navigate = useNavigate();
    const matches = useMediaQuery('(min-width: 800px)')

    useEffect (() => {
        if (user?.role === "ADMIN") {
            setAuthorized(true)
        } else {
            navigate('/');
        }
    }, [navigate]);









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
                <AppShell.Navbar p='lg' zIndex={300}>
                    <Stack justify='space-between' h='100%'>
                        <Stack gap='xs' >
                            <p>navBar</p>
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
                    {!matches && <AsideBuilder/>}
                </AppShell.Main>



                <AppShell.Aside>
                    <AsideBuilder/>
                </AppShell.Aside>
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