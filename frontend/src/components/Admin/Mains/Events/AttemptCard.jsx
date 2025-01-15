import {Card, Flex, Group, Stack, Title} from "@mantine/core";
import PropTypes from "prop-types";
import {getTimeString} from "../../../../services/misc.services.js";
import {DonutChart} from "@mantine/charts";
import '@mantine/charts/styles.css'
import EnterLiveEventButton from "./EnterLiveEventButton.jsx";


const AttemptCard = ({item: attempt, injection: data}) => {

    return (
        <Card w='100%' withBorder>
            <Group w='100%' justify='space-between'>
                <Card p='sm' w='fit-content'>
                    <Flex h='60%' p='sm' direction='column' align='flex-start'>
                        <Title lineClamp={1} align='left' order={4}>
                            {`Start: ${getTimeString(attempt.startTime)}${attempt.endTime ? ` - End: ${getTimeString(attempt.endTime)}`: ``}`}
                        </Title>
                        <Title order={5}>
                            {new Date(attempt.startTime).toDateString()}
                        </Title>
                    </Flex>
                </Card>





                <Stack h='100%' justify='center' w='fit-content'>
                    {attempt.endTime ? (
                        (data?.event?.published) ?
                            <DonutChart
                                withTooltip={false}
                                data={[
                                    {name: 'Correct', value: attempt.score || 0, color: 'indigo'},
                                    {name: 'Wrong', value: (data?.competition?.points - attempt.score) || 0, color: 'gray'}
                                ]}
                                chartLabel={`${Math.round(((attempt.score || 0) / (data?.competition?.points || 0)) * 100)}%`}
                                thickness={30}
                                size={125}
                            />
                         : (
                            <Title order={4}>Not Published</Title>
                            )
                    ) : (
                        <EnterLiveEventButton event={data?.event} attempts={data?.attempts} />
                    )}
                </Stack>
            </Group>
        </Card>
    );
};





AttemptCard.propTypes = {
    item: PropTypes.object.isRequired,
    injection: PropTypes.object,
};

export default AttemptCard