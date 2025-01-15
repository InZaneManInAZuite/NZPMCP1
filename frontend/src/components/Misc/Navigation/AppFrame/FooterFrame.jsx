import {Anchor, Code, Group, Stack, Title} from "@mantine/core";
import LogoutButton from "../NavComponents/LogoutButton.jsx";
import {useContext} from "react";
import UserContext from "../../../../context/UserContext.js";
import NavigatorButton from "../NavComponents/NavigatorButton.jsx";
import PropTypes from "prop-types";

const FooterFrame = ({nav, label, linkFunc}) => {

    const { user } = useContext(UserContext);

    return (
        <Group justify='space-between'>
            <Stack>
                <Group>
                    <Title order={2} >{user.name}</Title>
                    {user.role !== 'USER' && (
                        <Code color='blue' w='fit-content'>{user.role}</Code>
                    )}
                </Group>
                <Anchor c='gray' underline='never' ta='left' mb='lg'>{user.email}</Anchor>
            </Stack>



            <Group gap='sm'>
                {nav && <NavigatorButton label={label} nav={nav} w='150px' linkFunc={linkFunc} />}
                <LogoutButton w='150px'/>
            </Group>
        </Group>
    )
}

FooterFrame.propTypes = {
    nav: PropTypes.string,
    label: PropTypes.string,
    linkFunc: PropTypes.func,
}

export default FooterFrame