import PropTypes from "prop-types";
import CustomComboBox from "../../../Misc/CustomComboBox/CustomComboBox.jsx";


const RoleComboBox = ({form, disabled}) => {

    const roles = ['USER', 'ADMIN', 'BUILDER'];

    const field = 'Role'

    return(
        <CustomComboBox field={field} form={form} selection={roles} disabled={disabled}/>
    )
}

RoleComboBox.propTypes = {
    form: PropTypes.object,
    disabled: PropTypes.bool,
}

export default RoleComboBox