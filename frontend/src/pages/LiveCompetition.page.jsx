import LoggedOutLanding from '../components/Anonymous/LoggedOutLanding/LoggedOutLanding';
import UserContext from '../context/UserContext';
import {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MainLiveCompetition from "../components/Admin/Mains/LiveCompetition/MainLiveCompetition.jsx";

const LiveCompetitionPage = () => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [ authorized, setAuthorized ] = useState(false)

    useEffect(() => {
        if (user) {
            setAuthorized(true);
        }
    }, [navigate, user]);

    return (authorized) ? (
        <MainLiveCompetition/>
    ) : (
        <LoggedOutLanding />
    );
}

export default LiveCompetitionPage;