import NavBarAdmin from "../components/Misc/Navigation/NavBarAdmin.jsx";
import MainEvents from "../components/Admin/Mains/Events/MainEvents.jsx";


const AdminEventsPage = () => {
    return (
        <NavBarAdmin pageActive='Events'>
            <MainEvents/>
        </NavBarAdmin>
    )
}

export default AdminEventsPage