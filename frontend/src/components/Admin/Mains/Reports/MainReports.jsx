import ListFrame from "../../../Misc/ListFrame/ListFrame.jsx";
import {Button, Card, Group, Paper, Stack, Title} from "@mantine/core";
import {getAllEvents, updateEvent} from "../../../../services/event.services.js";
import {useContext, useEffect} from "react";
import ReportContext from "../../../../context/ReportContext.js";
import EventReportCard from "./EventReportCard.jsx";
import AttendeeReportCard from "./AttendeeReportCard.jsx";
import {gradeEvent} from "../../../../services/attempt.services.js";
import UserContext from "../../../../context/UserContext.js";


const MainReports = () => {

    const {jwtToken} = useContext(UserContext);
    const {reportable, setReportable, eventReport, setEventReport, attendeeReport, setGraded} = useContext(ReportContext);




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

    const handleGrade = () => {
        setGraded(false);
        const newEvent = {
            ...eventReport,
            graded: true,
        }
        gradeEvent(eventReport.id, jwtToken)
            .then(() => {
                setReportable(reportable.map(r => {
                    if (r.id === eventReport.id) {
                        return newEvent;
                    } else {
                        return r;
                    }
                }))
                setEventReport(newEvent);
            })
            .catch(() => console.log('Grading Failed'))
            .finally(setGraded(true));
    }

    const handlePublish = () => {
        const newEvent = {
            ...eventReport,
            published: true,
        }

        updateEvent(eventReport.id, newEvent, jwtToken)
            .then(() => {
                setEventReport(newEvent);
                setReportable(reportable.map(r => {
                    if (r.id === eventReport.id) {
                        return newEvent;
                    } else {
                        return r;
                    }
                }))
            })
            .catch(() => console.log('Publish Failed'))
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
                            <Button
                                onClick={handleGrade}
                            >
                                {eventReport?.graded ? 'Regrade' : 'Grade'}
                            </Button>
                            <Button
                                onClick={handlePublish}
                                disabled={!eventReport?.graded || eventReport?.published}
                            >
                                {eventReport?.published ? 'Published' : 'Publish'}
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