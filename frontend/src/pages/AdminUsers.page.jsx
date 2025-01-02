import NavBarAdmin from "../components/NavBarAdmin/NavBarAdmin.jsx";
import AdminMainUsers from "../components/Admin/Mains/Users/AdminMainUsers.jsx";


const AdminUsersPage = () => {
    return (
        <NavBarAdmin pageActive='Users'>
            <AdminMainUsers/>
        </NavBarAdmin>
    )
}

export default AdminUsersPage