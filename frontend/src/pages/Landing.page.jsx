import LoggedOutLanding from '../components/Anonymous/LoggedOutLanding/LoggedOutLanding';
import UserContext from '../context/UserContext';
import {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LandingPage = () => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [ authorized, setAuthorized ] = useState(false)

    useEffect(() => {
        if (user?.role === 'ADMIN') {
            navigate('/admin');
        } else {
            setAuthorized(true);
        }
    }, [navigate, user]);

    return (authorized) ? (
        <LoggedOutLanding />
    ) : (
        <LoggedOutLanding />
    );
}

export default LandingPage;