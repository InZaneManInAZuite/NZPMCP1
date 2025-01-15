import MainEvents from "../components/Admin/Mains/Events/MainEvents.jsx";
import NavBarUser from "../components/Misc/Navigation/NavBarUser.jsx";


const UserEventsPage = () => {
    return (
        <NavBarUser pageActive='Events'>
            <MainEvents/>
        </NavBarUser>
    )
}

export default UserEventsPage