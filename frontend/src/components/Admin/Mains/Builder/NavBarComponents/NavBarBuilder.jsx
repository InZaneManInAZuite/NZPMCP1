import ListFrame from "../../../../Misc/ListFrame/ListFrame.jsx";
import {Card, Stack} from "@mantine/core";
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

    return (
        <Stack h='100%'>
            <ListFrame
                height={h}
                width={w}
                items={competitions || []}
                Component={CompetitionSelectionCard}
                search='title'
                setChecker={setChecker}
                checkBoxLabel='Include Used'
                injection={injection}
            />

            <Card m='sm'>
                <CompetitionForm/>
            </Card>
        </Stack>
    )
}

NavBarBuilder.propTypes = {
    h: PropTypes.string,
    w: PropTypes.string,
}

export default NavBarBuilder