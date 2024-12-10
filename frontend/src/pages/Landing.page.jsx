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
        if (isAdmin) {
            console.log('navigating to admin');
            navigate('/admin');
        }
    }, [navigate, isAdmin]);

    if (!isLogged) {
        return(<LoggedOutLanding />);
    }

    return(<LoggedInLanding />);
}

export default LandingPage;