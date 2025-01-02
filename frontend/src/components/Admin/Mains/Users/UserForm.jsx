import {
    Title,
    Divider,
    TextInput,
    Button,
    Group,
    PasswordInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {useContext, useEffect, useState} from 'react'
import '@mantine/dates/styles.css'
import PropTypes from "prop-types";
import UserContext from "../../../../context/UserContext.js";
import {createUser, updateUser} from "../../../../services/user.services.js";
import RoleComboBox from "./RoleComboBox.jsx";

const UserForm = ({user, close, injection: data}) => {

    const { jwtToken, user: loggedInUser } = useContext(UserContext);
    const [ changesPresent, setChangesPresent ] = useState(false);

    const handleNameChange = (event) => form.setFieldValue('name', event.currentTarget.value);
    const handleEmailChange = (event) => form.setFieldValue('email', event.currentTarget.value);
    const handlePassChange = (event) => form.setFieldValue('password', event.currentTarget.value);
    const handleNewPassChange = (event) => form.setFieldValue('newPassword', event.currentTarget.value);
    const handleConfirmPassChange = (event) => form.setFieldValue('confirmPassword', event.currentTarget.value);





    const form = useForm({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            role: user?.role || 'USER',
            password: '',
            newPassword: '',
            confirmPassword: '',
        },
        validate: {
            name: (value) => {
                if (value.length === 0) {
                    return 'Name is required'
                }
            },
            email: (value) => {
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    return 'Email must be valid'
                }
            },
            role: (value) => {
                if (value.length === 0) {
                    return 'Please pick a role'
                }
            },
            password: (value) => {
                if (!user && value.length < 5) {
                    return 'Password must be longer than 5 characters'
                }
            },
            newPassword: (value) => {
                if (user && value.length < 5) {
                    return 'Password must be longer than 5 characters'
                }
            },
            confirmPassword: (value) => {
                if (!user && value !== form.values.password) {
                    return 'Password must match'
                } else if (user && value !== form.values.newPassword) {
                    return 'Password must match'
                }
            }
        }
    });





    const getNewUser = () => {
        return {
            id: user?.id,
            name: form.values.name,
            email: form.values.email,
            role: form.values.role,
        }
    }

    const getOldUser = () => {
        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            role: user?.role || 'USER',
        }
    }

    const clearFields = () => {
        form.setFieldValue('name', '');
        form.setFieldValue('email', '');
        form.setFieldValue('password', '');
        form.setFieldValue('newPassword', '');
        form.setFieldValue('confirmPassword', '');
        form.setFieldValue('role', 'USER');
    }





    useEffect(() => {
        const newUser = getNewUser()
        const oldUser = getOldUser()
        setChangesPresent(JSON.stringify(newUser) !== JSON.stringify(oldUser))
    }, [user, form]);





    const handleCreate = () => {
        const newUser = {
            ...getNewUser(),
            password: form.values.confirmPassword
        }
        createUser(newUser)
            .then(() => {
                data.setUsers(data.users.concat({...newUser, id: '-------------------------'}));
                clearFields();
            })
            .catch((err) => console.log(err));
    }

    const handleUpdate = () => {
        const newUser = getNewUser()
        updateUser(user?.id, newUser, jwtToken)
            .then(() => {
                clearFields();
                data.setUsers(data.users.map(eachUser => {
                    if (eachUser.id === user.id) {
                        return newUser
                    } else {
                        return eachUser
                    }
                }));
                close();
            })
            .catch((err) => console.log(err))
    }





    return (
        <>
            {(user) ? (
                <Title order={3}>Update User</Title>
            ) : (
                <Title order={2}>Register New User</Title>
            )}
            <Divider m='md'/>





            <form onSubmit={form.onSubmit(() => {
                return user ? handleUpdate() : handleCreate();
            })}>
                <TextInput
                    label='Name'
                    placeholder='Enter name'
                    value={form.values.name || ''}
                    onChange={handleNameChange}
                    error={form.errors.name}
                />
                <TextInput
                    label='Email'
                    placeholder='Enter email'
                    value={form.values.email || ''}
                    onChange={handleEmailChange}
                    error={form.errors.email}
                />
                <Divider m='lg' variant='dashed'/>




                {(loggedInUser.role === 'ADMIN') && (
                    <RoleComboBox form={form}/>
                )}
                <Divider m='lg' variant='dashed'/>





                {(!user) && (
                    <PasswordInput
                        label='Password'
                        placeholder='Enter password'
                        value={form.values.password || ''}
                        onChange={handlePassChange}
                        error={form.errors.password}
                    />
                )}
                {(user) && (
                    <PasswordInput
                        label='New Password'
                        placeholder='Enter new password'
                        value={form.values.newPassword || ''}
                        onChange={handleNewPassChange}
                        error={form.errors.newPassword}
                    />
                )}
                <PasswordInput
                    label='Confirm Password'
                    placeholder='Confirm password'
                    value={form.values.confirmPassword || ''}
                    onChange={handleConfirmPassChange}
                    error={form.errors.confirmPassword}
                />
                <Divider m='lg' variant='dashed'/>





                {(!user ? (
                    <Button mt='sm' w='100%' type='submit'>
                        Register
                    </Button>
                ) : (
                    <Group justify='center' mt='xl' gap='xl' grow>
                        <Button disabled={!changesPresent} type='submit'>
                            Save
                        </Button>

                        <Button onClick={() => {
                            clearFields();
                            close();
                        }}>
                            Cancel
                        </Button>
                    </Group>
                ))}
            </form>
        </>
    );
}





UserForm.propTypes = {
    user: PropTypes.object,
    close: PropTypes.func,
    injection: PropTypes.object,
}

export default UserForm