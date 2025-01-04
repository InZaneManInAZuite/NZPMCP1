import { useEffect, useState } from "react"
import UserContext from "./UserContext"
import PropTypes from 'prop-types'
import { authUser } from "../services/user.services"
import { getAllEvents } from "../services/event.services"

const UserContextProvider = ({ children }) => {

    // State variables to be stored
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([])
    const [jwtToken, setJwtToken] = useState("")





    const emailIsValid = (text) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text)
    } 

    const handleUser = (user) => {
        if (!user) {
            setUser(null)
        } else {
            setUser(user)
        }
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

            authUser(email, password)
            .then(user => {
                handleUser(user)
            })
            .catch(err => console.log(err))
        }
    }, [])





    // Store object to be passed to UserContext.Provider
    const store = {
        user, setUser,
        events, setEvents,
        jwtToken,setJwtToken,
        emailIsValid, handleUser,
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