import { useEffect, useState } from "react"
import UserContext from "./UserContext"
import PropTypes from 'prop-types'
import { getAllEvents } from "../services/event.services"
import {jwtDecode} from "jwt-decode";
import {refreshJwtToken} from "../services/user.services.js";

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

        getAllEvents().then(allEvents => setEvents(allEvents)).catch(err => console.log(err))

        refreshJwtToken()
            .then((token) => {
                setJwtToken(token)

                const decoded = jwtDecode(token)
                setUser(decoded);
            })
            .catch(() => console.log("Could not auto log-in"))
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