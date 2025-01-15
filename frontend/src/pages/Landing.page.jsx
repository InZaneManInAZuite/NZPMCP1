import LoggedOutLanding from '../components/Anonymous/LoggedOutLanding/LoggedOutLanding';
import UserContext from '../context/UserContext';
import {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import UserEventsPage from "./UserEvents.page.jsx";

const LandingPage = () => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [ authorized, setAuthorized ] = useState(false)

    useEffect(() => {
        if (user?.role === 'ADMIN') {
            navigate('/admin');
        } else if (user) {
            setAuthorized(true);
        }
    }, [navigate, user]);

    return (authorized) ? (
        <UserEventsPage />
    ) : (
        <LoggedOutLanding />
    );
}

export default LandingPage;