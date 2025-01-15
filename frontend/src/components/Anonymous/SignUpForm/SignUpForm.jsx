// Imports to create a sign-up form
import { Anchor, Card, Button, TextInput, PasswordInput, Stack } from '@mantine/core'
import UserContext from '../../../context/UserContext.js'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import classes from './SignUpForm.module.css'
import { useState, useContext } from 'react'
import { createUser } from '../../../services/user.services.js'


/**
 * This component is a sign-up form that allows users to create a new account
 * 
 * @returns SignUpForm component
 */
const SignUpForm = () => {

    // Manage states and contexts
    const [signUpFail, setSignUpFail] = useState(false);
    const { emailIsValid, isLogged } = useContext(UserContext)

    // Create a navigate function for redirecting the user
    const navigate = useNavigate();

    // Create a form using the useForm hook from Mantine
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },

        // Validate the email and password fields
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
            },
            password: (value) => {
                if (value.length < 5) {
                    return 'Password must be at least 5 characters long'
                } 
            },
            confirmPassword: (value) => {
                if (value !== form.values.password) {
                    return 'Passwords do not match'
                }
            }
        },
    });

    /**
     * This function is called when the user submits the form
     * It creates a new user and redirects them to the login page if successful
     * in order for them to fully login
     */
    const handleSignUp = () => {

        // Get the email and password from the form
        const name = form.values.name
        const email = form.values.email
        const password = form.values.password

        const newUser = {
            name: name,
            email: email,
            password: password,
        }
        
        // Create the user
        createUser(newUser)
            .then(() => {

                // Redirect the user to the login page if not yet logged in
                if (!isLogged){
                    navigate('/login')
                }
            })
            .catch((err) => {
                console.log(err)
                setSignUpFail(true)
            })
    }

    // Create functions to handle the email and password changes
    const onNameChange = (event) => {form.setFieldValue('name', event.currentTarget.value)}
    const onEmailChange = (event) => {form.setFieldValue('email', event.currentTarget.value)}
    const onPasswordChange = (event) => {form.setFieldValue('password', event.currentTarget.value)}
    const onConfirmPasswordChange = (event) => {form.setFieldValue('confirmPassword', event.currentTarget.value)}

    // Return the sign-up form
    return (
        <Card radius="lg" p="xl" className={classes.AuthCard} withBorder>
            <form onSubmit={form.onSubmit(() => handleSignUp())}>
                <Stack>
                    <TextInput
                        label="Name"
                        placeholder="Your Name"
                        value={form.values.name}
                        onChange={onNameChange}
                        error={form.errors.name}
                    />
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
                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        value={form.values.confirmPassword}
                        onChange={onConfirmPasswordChange}
                        error={form.errors.confirmPassword}
                    />
                    { signUpFail && (
                        <Anchor ta="center" c="red">
                            Email already taken. Please try again
                        </Anchor>
                    )}
                </Stack>
                <Stack justify="space-between" mt="xl">
                    <Button type="submit" radius="sm"  >
                        Create Account
                    </Button>
                    <Anchor ta="center" component="button" type="button" c="dimmed" onClick={() => navigate('/login')}>
                        {!isLogged && 'Already have an account? Login here'}
                    </Anchor>
                </Stack>
            </form>
        </Card>
    );
};

export default SignUpForm;