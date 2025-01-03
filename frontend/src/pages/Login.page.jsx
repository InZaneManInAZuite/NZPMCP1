import LoginForm from '../components/Anonymous/LoginForm/LoginForm'
import UserContext from '../context/UserContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    
    // Prevent logged in users from accessing the login page
    const { isLogged } = useContext(UserContext);
    const navigate = useNavigate();

    // Redirect the user to the landing page if they are already logged in
    useEffect(() => {
        if (isLogged) {
            navigate('/');
        }
    }, [navigate, isLogged]);

    // Render the login page
    return (
        <LoginForm />
    );
}

export default LoginPage;