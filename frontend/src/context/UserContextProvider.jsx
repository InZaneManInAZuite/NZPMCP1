import { useEffect, useState } from "react"
import UserContext from "./UserContext"
import PropTypes from 'prop-types'
import { authUser } from "../services/user.services"
import { getAllEvents } from "../services/event.services"

/**
 * UserContextProvider is a wrapper component that provides the UserContext to all child components
 * 
 * @param {ReactChild} children refers to the child elements that are wrapped by the UserContextProvider
 * 
 * @returns UserContext Provider
 */
const UserContextProvider = ({ children }) => {

    // State variables to be stored
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const [jwtToken, setJwtToken] = useState("")

    // Admin credentials
    const ADMIN_ID = import.meta.env.VITE_ADMIN_ID
    const ADMIN_PW = import.meta.env.VITE_ADMIN_PW

    /** 
     * Function to check if email is valid
     * 
     * @param {string} text refers to the email to be checked
     * 
     * @returns boolean value indicating if email is valid
    */
    const emailIsValid = (text) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text)
    } 

    /**
     * Function to handle cases where user is logged in or out
     * 
     * @param {Object} user refers to the user object
     */
    const handleUser = (user) => {
        if (!user) {
            setIsLogged(false)
            setUser(null)
        } else {
            setIsLogged(true)
            setUser(user)
        }
    }

    /**
     * Function to handle cases where user is an admin
     * 
     * @param {boolean} bool it is a boolean value that indicates if the user is an admin
     */
    const handleAdmin = (bool) => {
        if (!bool) {
            setIsLogged(false)
            setIsAdmin(false)
            return
        }

        setIsAdmin(true)
        setIsLogged(true)
    }

    // useEffect to check if user's credentials are stored in cookies
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


    // Store object to be passed to UserContext.Provider
    const store = {
        isLogged: isLogged,
        user: user,
        events: events,
        isAdmin: isAdmin,
        jwtToken: jwtToken,
        setIsLogged: setIsLogged,
        setUser: setUser,
        setEvents: setEvents,
        setIsAdmin: setIsAdmin,
        setJwtToken: setJwtToken,
        emailIsValid: emailIsValid,
        handleUser: handleUser,
        handleAdmin: handleAdmin,
        ADMIN_ID: ADMIN_ID,
        ADMIN_PW: ADMIN_PW,
    }

    // Return UserContext.Provider with store as value
    return (
        <UserContext.Provider value={ store }>
        {children}
        </UserContext.Provider>
    );
}

// PropTypes for UserContextProvider
UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default UserContextProvider;