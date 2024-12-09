import { useEffect, useState } from "react"
import UserContext from "./UserContext"
import PropTypes from 'prop-types'
import { authUser } from "../services/user.services"

const UserContextProvider = ({ children }) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    const emailIsValid = (text) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text)
    } 

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
                setIsLogged(true)
            })
        }
    }, [])

    const store = {
        email: email,
        password: password,
        isLogged: isLogged,
        setEmail: setEmail,
        setPassword: setPassword,
        setIsLogged: setIsLogged,
        emailIsValid: emailIsValid,
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