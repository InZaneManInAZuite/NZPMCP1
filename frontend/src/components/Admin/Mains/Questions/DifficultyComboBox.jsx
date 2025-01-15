import PropTypes from "prop-types";
import CustomComboBox from "../../../Misc/CustomComboBox/CustomComboBox.jsx";


const DifficultyComboBox = ({form, disabled}) => {

    const difficulties = ['Easy', 'Medium', 'Hard'];

    const field = 'Difficulty'

    return(
        <CustomComboBox field={field} form={form} selection={difficulties} disabled={disabled}/>
    )
}

DifficultyComboBox.propTypes = {
    form: PropTypes.object,
    disabled: PropTypes.bool,
}

export default DifficultyComboBox