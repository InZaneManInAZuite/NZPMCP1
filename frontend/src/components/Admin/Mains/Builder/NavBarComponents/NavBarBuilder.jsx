import ListFrame from "../../../../Misc/ListFrame/ListFrame.jsx";
import {Card, ScrollArea, Stack} from "@mantine/core";
import {useContext, useEffect } from "react";
import {getAllCompetitions} from "../../../../../services/competition.services.js";
import UserContext from "../../../../../context/UserContext.js";
import PropTypes from "prop-types";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import CompetitionForm from "../../Competitions/CompetitionForm.jsx";
import CompetitionSelectionCard from "./CompetitionSelectionCard.jsx";


const NavBarBuilder = ({h, w}) => {

    const { jwtToken } = useContext(UserContext);
    const { competitions, setCompetitions } = useContext(CompetitionContext);

    useEffect(() => {
        getAllCompetitions(jwtToken)
            .then(allCompetes => {
                setCompetitions(allCompetes)
            })
            .catch(e => console.log(e))
    }, [jwtToken, setCompetitions])

    const setChecker = (item, checked) => {
        if (checked) {
            return true;
        } else {
            return !item.events?.length > 0;
        }
    }

    const injection = {
        competitions, setCompetitions
    }

    return (<>
        <ScrollArea
            pl='xs' pr='xs' pt='xs'
            scrollbarSize={4}
            w={w}
            h={h}
            type='always'>
            <Stack h='100%'>
                <ListFrame
                    height={h - 25}
                    width='100%'
                    items={competitions || []}
                    Component={CompetitionSelectionCard}
                    search='title'
                    setChecker={setChecker}
                    checkBoxLabel='Include Used'
                    injection={injection}
                    NewForm={CompetitionForm}
                    withForm
                />
            </Stack>
        </ScrollArea>
    </>)
}

NavBarBuilder.propTypes = {
    h: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    w: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
}

export default NavBarBuilder