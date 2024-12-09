import { Title, Text } from '@mantine/core';
import classes from './Welcome.module.css';

const Welcome = () => {

    const gradient = {
        from: 'purple',
        to: 'cyan',
    }

  return (
    <Title order={1} className={classes.welcome} mt='8rem'>
        Welcome to
        <Text variant="gradient" gradient={gradient} className={classes.subtitle}>
            NZPMC
        </Text>
    </Title>
  );
}

export default Welcome;