import PropTypes from "prop-types";
import {Burger, Group, Paper, Text} from "@mantine/core";
import classes from "../../../Admin/Mains/Builder/Builder.module.css";


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
                    className={classes.burger}
                />
            )}
        </Group>
    )
}

HeaderFrame.propTypes = {
    navMatcher: PropTypes.bool.isRequired,
    opened: PropTypes.bool.isRequired,
    toggle: PropTypes.func,
}

export default HeaderFrame