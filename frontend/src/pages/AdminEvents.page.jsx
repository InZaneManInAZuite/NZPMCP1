import NavBarAdmin from "../components/Misc/Navigation/NavBarAdmin.jsx";
import AdminMainEvents from "../components/Admin/Mains/Events/AdminMainEvents.jsx";


const AdminEventsPage = () => {
    return (
        <NavBarAdmin pageActive='Events'>
            <AdminMainEvents/>
        </NavBarAdmin>
    )
}

export default AdminEventsPage