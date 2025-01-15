import NavBarAdmin from "../components/Misc/Navigation/NavBarAdmin.jsx";
import MainQuestions from "../components/Admin/Mains/Questions/MainQuestions.jsx";


const AdminQuestionsPage = () => {
    return (
        <NavBarAdmin pageActive='Questions'>
            <MainQuestions/>
        </NavBarAdmin>
    )
}

export default AdminQuestionsPage