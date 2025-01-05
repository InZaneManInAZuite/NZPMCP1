import ListFrame from "../../../Misc/ListFrame/ListFrame.jsx";
import {Card, Center, Paper} from "@mantine/core";
import {useContext, useEffect} from "react";
import UserContext from "../../../../context/UserContext.js";
import {getAllCompetitions} from "../../../../services/competition.services.js";
import CompetitionCard from "./CompetitionCard.jsx";
import CompetitionForm from "./CompetitionForm.jsx";
import CompetitionContext from "../../../../context/CompetitionContext.js";


const MainCompetitions = () => {

    const { jwtToken } = useContext(UserContext)
    const { competitions, setCompetitions } = useContext(CompetitionContext)

    useEffect(() => {
        getAllCompetitions(jwtToken)
            .then(allCompetes => {
                setCompetitions(allCompetes)
            })
            .catch(e => console.log(e))
    }, [jwtToken])

    const setChecker = (item, checked) => {
        if (checked) {
            return true;
        } else {
            return !item.events?.length > 0;
        }
    }

    return (
        <Paper>
            <ListFrame
                items={competitions || []}
                Component={CompetitionCard}
                search='title'
                setChecker={setChecker}
                checkBoxLabel='Include Used Competitions'
            />

            <Center>
                <Card p='xl' radius='xl' mt='xl'  w='700px'>
                    <CompetitionForm/>
                </Card>
            </Center>

        </Paper>
    )
}


export default MainCompetitions