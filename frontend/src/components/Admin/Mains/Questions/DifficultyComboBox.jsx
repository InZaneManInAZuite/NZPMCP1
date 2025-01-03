import PropTypes from "prop-types";
import CustomComboBox from "../../../Misc/CustomComboBox/CustomComboBox.jsx";


const DifficultyComboBox = ({form}) => {

    const difficulties = ['Easy', 'Medium', 'Hard'];

    const field = 'Difficulty'

    return(
        <CustomComboBox field={field} form={form} selection={difficulties}/>
    )
}

DifficultyComboBox.propTypes = {
    form: PropTypes.object,
}

export default DifficultyComboBox