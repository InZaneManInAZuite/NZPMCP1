import { useState } from "react";
import UserContext from "./UserContext";
import PropTypes from 'prop-types';

const UserContextProvider = ({ children }) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const store = {
        email: email,
        password: password,
        setEmail: setEmail,
        setPassword: setPassword,
    }

    return (
        <UserContext.Provider value={ store }>
        {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default UserContextProvider;