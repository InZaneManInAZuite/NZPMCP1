import { Paper, Card, Title, Text, Divider, TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import UserContext from '../../context/UserContext'
import { useContext, useState } from 'react'
import classes from './UserSettings.module.css'
import { updateUser } from '../../services/user.services'
import { useNavigate } from 'react-router-dom'

const UserSettings = () => {

    const { user, setUser, emailIsValid, handleUser, isAdmin, handleAdmin } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
        },

        validate: {
            name: (value) => {
                if (value.length === 0) {
                    return 'Name is required'
                }
            },
            email: (value) => {
                if (value.length === 0) {
                    return 'Email is required'
                } else if (!emailIsValid(value)) {
                    return 'Email must be valid'
                }
            }
        }
    });

    const handleSave = () => {

        if (form.values.name === user.name && form.values.email === user.email) {
            setIsEditing(false)
            return
        }
        const newUser = { ...user, name: form.values.name, email: form.values.email }
        updateUser(user.id, newUser)
            .then((updatedUser) => {
                setUser(updatedUser)
                setIsEditing(false)

                form.values.name = updatedUser.name
                form.values.email = updatedUser.email

                document.cookie = `email=${updatedUser.email}; path=/; secure`


            })
    }

    const handleLogout = () => {
        document.cookie = 'email=; path=/; secure'
        document.cookie = 'password=; path=/; secure'
        handleUser(null)
        handleAdmin(false)
        navigate('/')
    }

    const handleNameChange = (event) => {form.setFieldValue('name', event.currentTarget.value)};
    const handleEmailChange = (event) => {form.setFieldValue('email', event.currentTarget.value)};

    return (
        <Paper p='xl' className={classes.side}>
            <Card p='xl'>
                <Title order={1}>{!isAdmin ? 'User Settings' : 'Admin'}</Title>
                
                
                <Divider m='md'/>

                {isEditing && (
                    <form onSubmit={form.onSubmit(() => handleSave())}>
                        <TextInput
                            required
                            label='Name'
                            placeholder='Enter your name'
                            value={form.values.name}
                            onChange={handleNameChange}
                            error={form.errors.name}
                        />
                        <TextInput
                            required
                            label='Email'
                            placeholder='Enter your email'
                            value={form.values.email}
                            onChange={handleEmailChange}
                            error={form.errors.email}
                        />
                        <Button 
                            className={classes.save} 
                            type='submit' 
                        >
                            Save
                        </Button>
                        <Button className={classes.cancel} onClick={() => setIsEditing(false)}>Cancel</Button>

                    </form>
                )}
                {!isEditing && !isAdmin && (
                    <div>
                        <Text>Name: {user.name}</Text>
                        <Text>Email: {user.email}</Text>
                        <Button className={classes.edit} onClick={() => setIsEditing(true)}>Edit</Button>
                        <Button className={classes.logout} onClick={() => handleLogout()}>Logout</Button>
                    </div>
                )}
                {isAdmin && (
                    <Button className={classes.logout} onClick={() => handleLogout()}>Logout</Button>
                )}
            </Card>
        </Paper>
    );
}

export default UserSettings;