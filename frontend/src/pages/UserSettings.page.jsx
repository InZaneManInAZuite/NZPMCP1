import MainSettings from "../components/Admin/Mains/Settings/MainSettings.jsx";
import NavBarUser from "../components/Misc/Navigation/NavBarUser.jsx";


const UserSettingsPage = () => {
    return (
        <NavBarUser pageActive='Settings'>
            <MainSettings/>
        </NavBarUser>
    )
}

export default UserSettingsPage