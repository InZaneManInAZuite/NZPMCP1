import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AttemptContext from "../../../../context/AttemptContext.js";
import PropTypes from "prop-types";
import {Button} from "@mantine/core";
import AppShellContext from "../../../../context/AppShellContext.js";


const EnterLiveEventButton = ({event, attempts}) => {

    const {time} = useContext(AppShellContext);
    const {setLiveEvent} = useContext(AttemptContext);

    const [isLive, setIsLive] = useState(false);
    const [limitReached, setLimitReached] = useState(true);

    const navigate = useNavigate()

    const handleEnter = () => {
        setLiveEvent(event);
        navigate(`/competition/live/${event.id}`)
    }

    useEffect(() => {
        if (event?.attemptLimit > attempts?.length) {
            setLimitReached(false);
        } else {
            setLimitReached(true);
        }
    }, [event, attempts])






    useEffect(() => {
        const isToday = (((new Date(event.date)).toDateString()) === ((new Date(Date.now())).toDateString()))

        if (!isToday) {
            setIsLive(false)
        } else if (event.startTime) {
            if (event.endTime) {
                setIsLive(((Date.parse(event.startTime) <= time) && (Date.parse(event.endTime) > time)))
            } else {
                setIsLive(Date.parse(event.startTime) < time)
            }
        } else {
            setIsLive(false)
        }
    }, [time])







    return ((isLive && !limitReached) && (
        <Button
            onClick={handleEnter}
            color='yellow'
        >
            {attempts?.find(a => !a.endTime) ? 'Continue' : 'Enter'}
        </Button>
    ))
}

EnterLiveEventButton.propTypes = {
    event: PropTypes.object,
    attempts: PropTypes.array,
}

export default EnterLiveEventButton;