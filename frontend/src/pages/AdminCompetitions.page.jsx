import NavBarAdmin from "../components/Misc/Navigation/NavBarAdmin.jsx";
import MainCompetitions from "../components/Admin/Mains/Competitions/MainCompetitions.jsx";


const AdminCompetitionsPage = () => {
    return (
        <NavBarAdmin pageActive='Competitions'>
            <MainCompetitions/>
        </NavBarAdmin>
    )
}

export default AdminCompetitionsPage