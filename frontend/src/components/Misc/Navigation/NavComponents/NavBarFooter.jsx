import {Anchor, Card, Code, Divider, Group, Space, Stack, Title} from "@mantine/core";
import LogoutButton from "./LogoutButton.jsx";
import {useContext} from "react";
import UserContext from "../../../../context/UserContext.js";
import NavigatorButton from "./NavigatorButton.jsx";
import PropTypes from "prop-types";


const NavBarFooter = ({nav, label}) => {

    const { user } = useContext(UserContext)

    return (
        <Stack h='200px'>
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
                <Space h='sm' />
                {nav && (<NavigatorButton nav={nav} label={label}/>)}
            </Card>
        </Stack>
    )
}

NavBarFooter.propTypes = {
    nav: PropTypes.string,
    label: PropTypes.string,
}

export default NavBarFooter