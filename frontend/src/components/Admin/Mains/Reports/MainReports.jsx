import ListFrame from "../../../Misc/ListFrame/ListFrame.jsx";
import {Button, Card, Group, Paper, Stack, Title} from "@mantine/core";
import {getAllEvents} from "../../../../services/event.services.js";
import {useContext, useEffect} from "react";
import ReportContext from "../../../../context/ReportContext.js";
import EventReportCard from "./EventReportCard.jsx";
import AttendeeReportCard from "./AttendeeReportCard.jsx";


const MainReports = () => {

    const {reportable, setReportable, eventReport, attendeeReport} = useContext(ReportContext);




    useEffect(() => {
        getAllEvents()
            .then(allEvents => {
                setReportable(allEvents.filter(e => e.competitionId));
            })
            .catch(() => console.log("Failed to retrieve reportable events"))
    }, [])

    const setChecker = (item, checked) => {
        if (checked) {
            return true
        } else {
            return (!item.published)
        }
    }

    return (
        <Paper>
            <ListFrame
                items={reportable}
                Component={EventReportCard}
                search='name'
                sort='date'
                setChecker={setChecker}
                checkBoxLabel='Include Published'
                height='450px'
            />





            <Card m='xl'>
                <Title> Report </Title>





                {eventReport ? (
                    <Stack>
                        <Title order={3}>{eventReport.name}</Title>
                        <Group grow m='xl' gap='lg'>
                            <Button>
                                {eventReport?.graded ? 'Regrade' : 'Grade'}
                            </Button>
                            <Button
                                disabled={!eventReport?.graded}
                            >
                                {eventReport?.published ? 'Republish' : 'Publish'}
                            </Button>
                        </Group>





                        {attendeeReport && (
                            <Card withBorder>
                                {attendeeReport?.map(a =>
                                    <AttendeeReportCard key={`MR_${eventReport.id}_ARC_${a.id}`} attendee={a} />
                                )}
                            </Card>
                        )}
                    </Stack>
                ) : (
                    <Title mt='xl' order={3}>--- Pick an event to see report ---</Title>
                )}




            </Card>


        </Paper>
    )
}

export default MainReports