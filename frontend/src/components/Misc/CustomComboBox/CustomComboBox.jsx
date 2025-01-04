import {Combobox, Input, InputBase, Text, useCombobox} from "@mantine/core";
import PropTypes from "prop-types";


const CustomComboBox = ({form, selection, field, disabled}) => {

    const comboBox = useCombobox({
        onDropdownClose: () => comboBox.resetSelectedOption(),
    });

    const options = selection.map((role) => (
        <Combobox.Option value={role} key={role}>{role}</Combobox.Option>
    ))

    return(<>
        <Text fw={500} size='sm'>{field}</Text>
        <Combobox
            disabled={disabled}
            w='40%'
            store={comboBox}
            onOptionSubmit={(value) => {
                form.setFieldValue(field.toLowerCase(), value)
                comboBox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    component='button'
                    type='button'
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents='none'
                    onClick={() => comboBox.toggleDropdown()}
                >
                    {form?.values[field.toLowerCase()] || <Input.Placeholder>Pick {field.toLowerCase()}</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    </>)
}

CustomComboBox.propTypes = {
    form: PropTypes.object,
    selection: PropTypes.array,
    field: PropTypes.string,
    disabled: PropTypes.bool,
}

export default CustomComboBox