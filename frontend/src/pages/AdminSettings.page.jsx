import NavBarAdmin from "../components/Misc/Navigation/NavBarAdmin.jsx";
import MainSettings from "../components/Admin/Mains/Settings/MainSettings.jsx";


const AdminSettingsPage = () => {
    return (
        <NavBarAdmin pageActive='Settings'>
            <MainSettings/>
        </NavBarAdmin>
    )
}

export default AdminSettingsPage