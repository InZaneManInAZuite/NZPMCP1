import { Button, Group, Paper } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './SignInAndLogin.module.css';

const SignInAndLogin = () => {

    const navigate = useNavigate();

  return (
    <Paper className={classes.sectionCard}>
      <Group className={classes.buttons}>
        <Button className={classes.button} onClick={() => navigate('/signup')}>Create Account</Button>
        <Button className={classes.button} onClick={() => navigate('/login')}>Log In</Button>
      </Group>
    </Paper>
  );
}

export default SignInAndLogin;
