import {Affix, Card, Text} from "@mantine/core";
import PropTypes from "prop-types";


const TimerAffix = ({text = '--:--:--'}) => {


    return (
        <Affix position={{bottom: 20, right: 20}}>
            <Card>
                <Text>{text}</Text>
            </Card>
        </Affix>
    )
}

TimerAffix.propTypes = {
    text: PropTypes.string,
}

export default TimerAffix;