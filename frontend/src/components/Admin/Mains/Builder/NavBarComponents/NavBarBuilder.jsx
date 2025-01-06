import {Tabs} from "@mantine/core";
import {useContext} from "react";
import {IconCalendarEvent, IconTournament} from "@tabler/icons-react";
import AppShellContext from "../../../../../context/AppShellContext.js";
import CompetitionsBuilderTab from "./CompetitionsBuilderTab.jsx";
import EventsBuilderTab from "./EventsBuilderTab.jsx";

const NavBarBuilder = () => {

    const { appH, headH, footH, tabH, navPresentQ } = useContext(AppShellContext);

    const stackH = () => (navPresentQ ? (appH - footH - headH - tabH) : (appH - 220 - headH - tabH));

    return (
        <Tabs defaultValue='competitions'>
            <Tabs.List grow h={tabH}>
                <Tabs.Tab value='competitions' leftSection={<IconTournament size={18} />}>
                    Competitions
                </Tabs.Tab>
                <Tabs.Tab value='events' leftSection={<IconCalendarEvent size={18} />}>
                    Events
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='competitions'>
                <CompetitionsBuilderTab h={stackH()}/>
            </Tabs.Panel>

            <Tabs.Panel value='events'>
                <EventsBuilderTab h={stackH()}/>
            </Tabs.Panel>
        </Tabs>
    )
}

export default NavBarBuilder