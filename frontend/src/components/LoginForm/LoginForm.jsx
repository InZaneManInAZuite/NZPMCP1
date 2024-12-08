// Create a login and sign up form
import { Anchor, Card, Button, TextInput, PasswordInput, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import classes from './LoginForm.module.css'
import { useState } from 'react'

const LoginForm = () => {

    const [loginFail, toggleLoginFail] = useState(false);
    const navigate = useNavigate();


    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

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
     * @todo Implement login functionality
     */
    const handleLogin = async () => {
        console.log(form.values.email)
        console.log(form.values.password)
        toggleLoginFail(true)
        navigate('/landing')
    }

    const onEmailChange = (event) => {form.setFieldValue('email', event.currentTarget.value)}
    const onPasswordChange = (event) => {form.setFieldValue('password', event.currentTarget.value)}


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