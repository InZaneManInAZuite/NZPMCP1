import LoggedOutLanding from '../components/LoggedOutLanding/LoggedOutLanding';
import LoggedInLanding from '../components/LoggedInLanding/LoggedInLanding';
import UserContext from '../context/UserContext';
import { useContext } from 'react';

const LandingPage = () => {

    const { isLogged } = useContext(UserContext);

    if (!isLogged) {
        return(<LoggedOutLanding />);
    }

    return(<LoggedInLanding />);
}

export default LandingPage;