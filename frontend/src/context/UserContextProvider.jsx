import { useEffect, useState } from "react"
import UserContext from "./UserContext"
import PropTypes from 'prop-types'
import { authUser } from "../services/user.services"

const UserContextProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);

    const emailIsValid = (text) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text)
    } 

    const handleUser = (user) => {
        if (!user || !user.name || !user.email || !user.password) {
            setIsLogged(false)
            setUser(null)
        } else {
            setIsLogged(true)
            setUser(user)
        }
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
                handleUser(user)
            })
        }
    }, [])

    const store = {
        isLogged: isLogged,
        user: user,
        setIsLogged: setIsLogged,
        setUser: setUser,
        emailIsValid: emailIsValid,
        handleUser: handleUser,
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