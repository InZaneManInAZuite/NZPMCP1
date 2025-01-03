import {Combobox, Input, InputBase, Text, useCombobox} from "@mantine/core";
import PropTypes from "prop-types";


const RoleComboBox = ({form}) => {

    const roles = ['USER', 'ADMIN', 'BUILDER'];

    const comboBox = useCombobox({
        onDropdownClose: () => comboBox.resetSelectedOption(),
    });

    const options = roles.map((role) => (
        <Combobox.Option value={role} key={role}>{role}</Combobox.Option>
    ))

    return(<>
        <Text fw={500} size='sm'>Role</Text>
        <Combobox
            w='50%'
            store={comboBox}
            onOptionSubmit={(value) => {
                form.setFieldValue('role', value)
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
                    {form?.values.role || <Input.Placeholder>Pick role</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    </>)
}

RoleComboBox.propTypes = {
    form: PropTypes.object,
}

export default RoleComboBox