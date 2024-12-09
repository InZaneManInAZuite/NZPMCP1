import { useEffect, useState } from "react"
import UserContext from "./UserContext"
import PropTypes from 'prop-types'
import { authUser } from "../services/user.services"

const UserContextProvider = ({ children }) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        const loggedCookie = document.cookie.split('; ')
        const emailCookie = loggedCookie.find(cookie => cookie.startsWith('email='))
        const passwordCookie = loggedCookie.find(cookie => cookie.startsWith('password='))

        if (emailCookie && passwordCookie) {
            const email = emailCookie.split('=')[1]
            const password = passwordCookie.split('=')[1]

            authUser(email, password)
            .then(user => {
                setEmail(user.email)
                setPassword(user.password)
            })
        }
    }, [])

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