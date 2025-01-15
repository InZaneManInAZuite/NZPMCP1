import NavBarAdmin from "../components/Misc/Navigation/NavBarAdmin.jsx";
import MainReports from "../components/Admin/Mains/Reports/MainReports.jsx";


const AdminReportsPage = () => {
    return (
        <NavBarAdmin pageActive='Reports'>
            <MainReports/>
        </NavBarAdmin>
    )
}

export default AdminReportsPage