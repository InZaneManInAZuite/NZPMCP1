import PropTypes from "prop-types";
import {Card, Divider, Flex, Group, Stack, Text, Title} from "@mantine/core";
import ReportContext from "../../../../context/ReportContext.js";
import {useContext, useEffect, useState} from "react";
import {getAttemptsByUserAndEvent} from "../../../../services/attempt.services.js";
import UserContext from "../../../../context/UserContext.js";
import {getTimeString} from "../../../../services/misc.services.js";
import {getCompetition} from "../../../../services/competition.services.js";

const AttendeeReportCard = ({attendee}) => {

    const { jwtToken } = useContext(UserContext);
    const { eventReport, competitionReport } = useContext(ReportContext);

    const [ attempts, setAttempts ] = useState([])


    useEffect(() => {
        getAttemptsByUserAndEvent(attendee.id, eventReport.id, jwtToken)
            .then(allAttempts => {
                setAttempts(allAttempts)
            })
            .catch(() => console.log('Failed to obtain attempts'))
    }, [attendee, eventReport, jwtToken]);


    return (
        <Card withBorder>
            <Stack>
                <Group justify='space-between'>
                    <Title lineClamp={1} align='left' order={2}>{attendee.name}</Title>
                    <Text lineClamp={1}>{attendee.email} - {attendee.id}</Text>
                </Group>




                <Divider/>
                <Stack>
                    {attempts && attempts?.map(attempt =>
                        <Card key={`ARC_${attendee.id}_ASC_${attempt.id}`}>
                            <Group justify='space-between'>
                                <Group>
                                    <Text>{`Date: ${new Date(attempt.startTime).toDateString()}`}</Text>
                                    <Text>{`Start: ${getTimeString(attempt.startTime)}`}</Text>
                                    {attempt.endTime && (
                                        <Text>{`End: ${getTimeString(attempt.endTime)}`}</Text>
                                    )}
                                </Group>


                                {(attempt?.score) ? (
                                    <Group>
                                        <Text>Grade:</Text>
                                        <Text>{attempt?.score}</Text>
                                        {(competitionReport?.points) && (<>
                                            <Text>{`/`}</Text>
                                            <Text>{competitionReport?.points}</Text>
                                        </>)}
                                    </Group>
                                ) : (
                                    <Text>Not Graded</Text>
                                )}
                            </Group>
                        </Card>
                    )}
                </Stack>
            </Stack>
        </Card>
    )

}

AttendeeReportCard.propTypes = {
    attendee: PropTypes.object.isRequired,
}

export default AttendeeReportCard