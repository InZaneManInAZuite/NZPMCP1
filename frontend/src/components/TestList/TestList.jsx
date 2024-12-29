import ListFrame from "../ListFrame/ListFrame.jsx";
import {getAllUsers} from "../../services/user.services.js";
import UserCard from "../UserCard/UserCard.jsx";


const TestList = () => {

    const setChecker = (item) => {
        return item.role !== "ADMIN"
    }


    return (<>
            <ListFrame
                getAllFunc={getAllUsers}
                Component={UserCard}
                search={['name', 'email']}
                filter={{role: ['ADMIN', 'USER']}}
                setChecker={setChecker}
                checkBoxLabel='Include Admins'

            />
        </>

    )
}

export default TestList