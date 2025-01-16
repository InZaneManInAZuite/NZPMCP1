import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useMediaQuery, useViewportSize} from "@mantine/hooks";
import AppShellContext from "./AppShellContext.js";
import {Client} from "@stomp/stompjs";

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




    const [time, setTime] = useState(undefined);
    const [connected, setConnected] = useState(false);

    const stompClient = new Client({
        brokerURL: () => {
            if (import.meta.env.PROD){
                return `ws://nzpmcp1-1.onrender.com/ws`
            } else {
                return `ws://localhost:8080/ws`
            }
            }
    })

    stompClient.onConnect = () => {
        if (!connected) {
            setConnected(true);
            stompClient.subscribe('/topic/timer', (timer) => {
                setTime(Date.parse(timer?.body.substring(1, 20)))
            })
        }
    }

    stompClient.onDisconnect = () => {
        stompClient.unsubscribe('/topic/timer');
    }

    stompClient.onWebSocketError = (error) => {
        console.error(`Websocket Error: ${error}`);
    }

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };


    useEffect(() => {
        if (!connected) {
            stompClient.activate()
        }
    }, [connected]);





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
        
        

        time
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