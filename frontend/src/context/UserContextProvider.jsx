import { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(false);

    const username = document.cookie.split(';').find(cookie => cookie.includes('username'));
    const password = document.cookie.split(';').find(cookie => cookie.includes('password'));

    const checkLogin = (username, password) => {
        // TODO: implement login check once backend is ready
        setUser(true);
    }

    const store = {
        user: user,
        setUser: setUser,
    }

    return (
        <UserContext.Provider value={ store }>
        {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;