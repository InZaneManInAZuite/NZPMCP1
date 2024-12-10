import LoggedOutLanding from '../components/LoggedOutLanding/LoggedOutLanding';
import LoggedInLanding from '../components/LoggedInLanding/LoggedInLanding';
import UserContext from '../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LandingPage = () => {

    const navigate = useNavigate();

    const { isLogged, isAdmin } = useContext(UserContext);

    useEffect(() => {
        if (isLogged && isAdmin) {
            console.log('navigating to admin');
            navigate('/admin');
        }
    }, []);

    if (isAdmin) {
        return null
    }

    if (!isLogged) {
        return(<LoggedOutLanding />);
    }

    return(<LoggedInLanding />);
}

export default LandingPage;