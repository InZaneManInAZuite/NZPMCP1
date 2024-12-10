import { useEffect, useState } from "react"
import UserContext from "./UserContext"
import PropTypes from 'prop-types'
import { authUser } from "../services/user.services"
import { getAllEvents } from "../services/event.services"

const UserContextProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const ADMIN_ID = import.meta.env.VITE_ADMIN_ID
    const ADMIN_PW = import.meta.env.VITE_ADMIN_PW

    const emailIsValid = (text) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text)
    } 

    const handleUser = (user) => {
        if (!user) {
            setIsLogged(false)
            setUser(null)
        } else {
            document.cookie = `email=${user.email}; path=/; secure`
            document.cookie = `password=${user.password}; path=/; secure`
            setIsLogged(true)
            setUser(user)
        }
    }

    const handleAdmin = (bool) => {
        document.cookie = `email=${ADMIN_ID}; path=/; secure`
        document.cookie = `password=${ADMIN_PW}; path=/; secure`
        setIsAdmin(bool)
        setIsLogged(bool)
    }

    useEffect(() => {
        const loggedCookie = document.cookie.split('; ')
        const emailCookie = loggedCookie.find(cookie => cookie.startsWith('email='))
        const passwordCookie = loggedCookie.find(cookie => cookie.startsWith('password='))

        getAllEvents().then(allEvents => setEvents(allEvents)).catch(err => console.log(err))

        if (emailCookie && passwordCookie) {
            const email = emailCookie.split('=')[1]
            const password = passwordCookie.split('=')[1]

            if (!email) return

            if (email === ADMIN_ID && password === ADMIN_PW) {
                handleAdmin(true)
                return
            }

            authUser(email, password)
            .then(user => {
                handleUser(user)
            })
            .catch(err => console.log(err))
        }
    }, [])

    const store = {
        isLogged: isLogged,
        user: user,
        events: events,
        isAdmin: isAdmin,
        setIsLogged: setIsLogged,
        setUser: setUser,
        setEvents: setEvents,
        setIsAdmin: setIsAdmin,
        emailIsValid: emailIsValid,
        handleUser: handleUser,
        handleAdmin: handleAdmin,
        ADMIN_ID: ADMIN_ID,
        ADMIN_PW: ADMIN_PW,
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