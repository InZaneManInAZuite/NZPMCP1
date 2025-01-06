import {ScrollArea, Stack} from "@mantine/core";
import ListFrame from "../../../../Misc/ListFrame/ListFrame.jsx";
import CompetitionSelectionCard from "./CompetitionSelectionCard.jsx";
import CompetitionForm from "../../Competitions/CompetitionForm.jsx";
import {useContext, useEffect} from "react";
import UserContext from "../../../../../context/UserContext.js";
import CompetitionContext from "../../../../../context/CompetitionContext.js";
import AppShellContext from "../../../../../context/AppShellContext.js";
import {getAllCompetitions} from "../../../../../services/competition.services.js";
import PropTypes from "prop-types";


const CompetitionsBuilderTab = ({h}) => {

    const { jwtToken } = useContext(UserContext);
    const { competitions, setCompetitions } = useContext(CompetitionContext);
    const { margin } = useContext(AppShellContext);

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

    return (
        <ScrollArea
            pl='xs' pr='xs' pt='xs'
            scrollbarSize={4}
            w='100%'
            h={h}
            type='always'>
            <Stack h='100%'>
                <ListFrame
                    height={h - margin}
                    width='100%'
                    items={competitions || []}
                    Component={CompetitionSelectionCard}
                    search='title'
                    setChecker={setChecker}
                    checkBoxLabel='Include Used'
                    NewForm={CompetitionForm}
                    withForm
                />
            </Stack>
        </ScrollArea>
    )
}

CompetitionsBuilderTab.propTypes = {
    h: PropTypes.number,
}

export default CompetitionsBuilderTab;