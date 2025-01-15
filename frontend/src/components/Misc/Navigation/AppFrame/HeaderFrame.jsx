import PropTypes from "prop-types";
import {Burger, Group, Paper, Text} from "@mantine/core";


const HeaderFrame = ({navMatcher, opened, toggle}) => {

    return(
        <Group justify='space-between' p='sm'>
            <Paper>
                <Text size='xl' fw={700}>NZPMC</Text>
            </Paper>
            {!navMatcher && (
                <Burger
                    opened={opened}
                    onClick={toggle}
                    size="sm"
                />
            )}
        </Group>
    )
}

HeaderFrame.propTypes = {
    navMatcher: PropTypes.bool,
    opened: PropTypes.bool,
    toggle: PropTypes.func,
}

export default HeaderFrame