import NavBarAdmin from "../components/NavBarAdmin/NavBarAdmin.jsx";
import AdminMainEvents from "../components/Admin/Mains/AdminMainEvents.jsx";


const AdminEventsPage = () => {
    return (
        <NavBarAdmin pageActive='Events'>
            <AdminMainEvents/>
        </NavBarAdmin>
    )
}

export default AdminEventsPage