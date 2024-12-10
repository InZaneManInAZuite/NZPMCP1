import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import UserContextProvider from './context/UserContextProvider';
import Router from './Router';
import { Theme } from './Theme';


export default function App() {
  return (
    <UserContextProvider>
      <MantineProvider theme={Theme} defaultColorScheme='dark'>
        <Router />
      </MantineProvider>
    </UserContextProvider>
  );
}
