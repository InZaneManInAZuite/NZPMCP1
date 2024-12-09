import { Button, Group, Paper, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './SignInAndLogin.module.css';

const SignInAndLogin = () => {

    const navigate = useNavigate();

  return (
    <Paper p="xl" className={classes.colorToggleCard}>
      <Title mb="lg" order={3}>Color Scheme</Title>
      <Group className={classes.buttons}>
        <Button className={classes.button} onClick={() => navigate('/signup')}>Sign Up</Button>
        <Button className={classes.button} onClick={() => navigate('/login')}>Log In</Button>
      </Group>
    </Paper>
  );
}

export default SignInAndLogin;
