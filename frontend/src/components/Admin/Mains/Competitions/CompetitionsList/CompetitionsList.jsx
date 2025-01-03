import {Card, Checkbox, Group, LoadingOverlay, ScrollArea, Text, TextInput} from '@mantine/core';
import {useContext, useEffect, useState} from 'react';
import classes from './CompetitionsList.module.css';
import { getAllCompetitions } from '../../../../../services/competition.services.js';
import CompetitionCard from "../CompetitionCard/CompetitionCard.jsx";
import UserContext from "../../../../../context/UserContext.js";

const CompetitionList = () => {

    const [ competitions, setCompetitions ] = useState([]);
    const { jwtToken } = useContext(UserContext);
    const [ filtered, setFiltered ] = useState(competitions);
    const [ checked, setChecked ] = useState(false);
    const [ searching, setSearching ] = useState('');

    useEffect(() => {
        getAllCompetitions(jwtToken)
            .then(allCompete  => {
                setCompetitions(allCompete);
            })
            .catch(err => console.log(err));
    }, [jwtToken])

    useEffect(() => {
        const f = competitions.filter(compete => {
            return compete.title?.toLowerCase().includes(searching.toLowerCase()) &&
                (checked || !compete.events?.length);
        })
        setFiltered(f.sort((a,b) => a.title.localeCompare(b.title)))
    }, [ searching, checked, competitions ]);

    const onSearchChange = (event) => setSearching(event.currentTarget.value)
    const onCheckChange = (event) => setChecked(event.currentTarget.checked)

    if (!filtered) {
        return (
            <LoadingOverlay/>
        )
    }

    return (
        <Card className={classes.layout} radius='md'>
            <Card.Section className={classes.bar} withBorder>
                <Group>
                    <Text>Search:</Text>
                    <TextInput
                        placeholder='Look for a competition'
                        value={searching}
                        onChange={onSearchChange}
                    />
                    <Checkbox
                        labelPosition='left'
                        label="Include used competitions"
                        checked={checked}
                        onChange={onCheckChange}
                    />
                </Group>
            </Card.Section>

            <Card.Section withBorder>
                <ScrollArea className={classes.scroll} scrollbars='y' type='scroll'>
                    <Card className={classes.eventsList}>
                        {filtered.map(compete => ( <CompetitionCard key={compete.title} competition={compete} />))}
                    </Card>
                </ScrollArea>
            </Card.Section>
        </Card>
    )
}

export default CompetitionList;