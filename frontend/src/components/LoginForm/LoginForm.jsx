// Create a login form
import { Anchor, Card, Button, TextInput, PasswordInput, Stack } from '@mantine/core'
import UserContext from '../../context/UserContext'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import classes from './LoginForm.module.css'
import { useState, useContext } from 'react'
import { authUser } from '../../services/user.services'


/**
 * This component is a login form that allows users to login to the application
 * 
 * @returns LoginForm component
 */
const LoginForm = () => {

    // Manage states and contexts
    const { setEmail, setPassword, setIsLogged } = useContext(UserContext)
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
                }
            },
            password: (value) => {
                if (value.length <= 5) {
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
                console.log('User Authenticated')

                // Set the email and password in the UserContext
                setEmail(user.email)
                setPassword(user.password)
                setIsLogged(true)

                // Set the email and password in the cookies
                document.cookie = `email=${user.email}; path=/; secure`
                document.cookie = `password=${user.password}; path=/; secure`

                // Redirect the user to the landing page
                navigate('/')
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
                        <Anchor ta="center" c="red" size="xs">
                            Login Failed. Try Again
                        </Anchor>
                    )}
                </Stack>
                <Stack justify="space-between" mt="xl">
                    <Button type="submit" radius="sm"  >
                        Login
                    </Button>
                    <Anchor ta="center" component="button" type="button" c="dimmed" size="xs">
                        Create an account
                    </Anchor>
                </Stack>
            </form>
        </Card>
    );
};

export default LoginForm;