// Imports to create a login form
import { Anchor, Card, Button, TextInput, PasswordInput, Stack } from '@mantine/core'
import UserContext from '../../../context/UserContext.js'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import classes from './LoginForm.module.css'
import { useState, useContext } from 'react'
import { authUser } from '../../../services/user.services.js'

/**
 * This component is a login form that allows users to login to the application
 * 
 * @returns LoginForm component
 */
const LoginForm = () => {


    // Manage states and contexts
    const { handleUser, emailIsValid, setJwtToken } = useContext(UserContext)
    const [loginFail, toggleLoginFail] = useState(false);

    // Create a navigate function for redirecting the user
    const navigate = useNavigate();

    // Create a form using the useForm hook from Mantine
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        // Validate the email and password fields
        validate: {
            email: (value) => {
                if (value.length === 0) {
                    return 'Email is required'
                } else if (!emailIsValid(value)) {
                    return 'Email must be valid'
                }
            },
            password: (value) => {
                if (value.length < 5) {
                    return 'Password must be at least 5 characters long'
                }
            }
        },
    });

    /**
     * This function is called when the user submits the form
     * It authenticates the user and redirects them to the landing page if successful
     */
    const handleLogin = () => {

        // Get the email and password from the form
        const email = form.values.email
        const password = form.values.password
        
        // Call the authUser function from user.services.js to authenticate the user
        authUser(email, password)
            .then((user) => {

                // If the user is authenticated, set the loginFail to false and log the message
                toggleLoginFail(false)

                // Store the user in the context
                handleUser(user)

                setJwtToken(user.token)

                // Redirect the user to the landing page
                if (user.role !== 'USER') {
                    navigate(`/admin`)
                } else {
                    navigate('/')
                }
            })
            .catch((err) => { 
                toggleLoginFail(true) 
                console.log(err)
            })
    }

    // Create functions to handle the email and password changes
    const onEmailChange = (event) => {form.setFieldValue('email', event.currentTarget.value)}
    const onPasswordChange = (event) => {form.setFieldValue('password', event.currentTarget.value)}

    // Return the login form
    return (
        <Card radius="lg" p="xl" className={classes.AuthCard} withBorder>
            <form onSubmit={form.onSubmit(() => handleLogin())}>
                <Stack>
                    <TextInput
                        label="Email"
                        placeholder="Your Email"
                        value={form.values.email}
                        onChange={onEmailChange}
                        error={form.errors.email}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your Password"
                        value={form.values.password}
                        onChange={onPasswordChange}
                        error={form.errors.password}
                    />
                    { loginFail && (
                        <Anchor ta="center" c="red">
                            Login Failed. Try Again
                        </Anchor>
                    )}
                </Stack>
                <Stack justify="space-between" mt="xl">
                    <Button type="submit" radius="sm">
                        Login
                    </Button>
                    <Anchor ta="center" component="button" type="button" c="dimmed" onClick={() => navigate('/signup')}>
                        Create an account
                    </Anchor>
                </Stack>
            </form>
        </Card>
    );
};

export default LoginForm;