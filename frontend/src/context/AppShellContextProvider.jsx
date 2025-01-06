import {useState} from "react";
import PropTypes from "prop-types";
import {useMediaQuery, useViewportSize} from "@mantine/hooks";
import AppShellContext from "./AppShellContext.js";

const AppShellContextProvider = ({ children }) => {

    // State variables to be stored
    const {height: appH, width: appW} = useViewportSize()

    const [headH, setHeadH] = useState(60);
    const [navW, setNavW] = useState(400);
    const [asideW, setAsideW] = useState(400);
    const [footH, setFootH] = useState(100);

    const [minMainW, setMinMainW] = useState(400);
    const [minMainH, setMinMainH] = useState(400);

    const [margin, setMargin] = useState(20);

    const navBreak = () => ((navW || 0) + (asideW || 0) + (minMainW || 0))
    const sideBreak = () => ((asideW || 0) + (minMainW || 0))
    const navPresentQ = useMediaQuery(`(min-width: ${navBreak()}px)`);
    const sidePresentQ = useMediaQuery(`(min-width: ${sideBreak()}px)`);

    const mainW = () => {
        return (appW - (navW || 0) - (asideW ||0))
    }

    const mainH = () => {
        return (appH - (headH || 0) - (footH ||0))
    }

    const [tabH, setTabH] = useState(40)

    const setBuilderShell = () => {
        setHeadH(60);
        setNavW(400);
        setAsideW(400);
        setFootH(100);

        setMinMainW(400);
        setMinMainH(400);

        setMargin(20);
        setTabH(40);
    }





    // Store object to be passed to UserContext.Provider
    const store = {
        appH, appW,
        headH, setHeadH,
        navW, setNavW,
        asideW, setAsideW,
        footH, setFootH,
        mainW, mainH,

        tabH, setTabH,
        margin, setMargin,

        minMainW, setMinMainW,
        minMainH, setMinMainH,
        navBreak, sideBreak,
        navPresentQ, sidePresentQ,

        setBuilderShell,
    }





    // Return UserContext.Provider with store as value
    return (
        <AppShellContext.Provider value={ store }>
            {children}
        </AppShellContext.Provider>
    );
};





AppShellContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppShellContextProvider;