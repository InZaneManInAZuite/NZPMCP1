import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import UserContextProvider from './context/UserContextProvider';
import Router from './Router';
import { Theme } from './Theme';
import CompetitionContextProvider from "./context/CompetitionContextProvider.jsx";
import AppShellContextProvider from "./context/AppShellContextProvider.jsx";
import AttemptContextProvider from "./context/AttemptContextProvider.jsx";


export default function App() {
  return (
      <AppShellContextProvider>
          <UserContextProvider>
              <AttemptContextProvider>
                  <CompetitionContextProvider>
                      <MantineProvider theme={Theme} defaultColorScheme='dark'>
                          <Router />
                      </MantineProvider>
                  </CompetitionContextProvider>
              </AttemptContextProvider>
          </UserContextProvider>
      </AppShellContextProvider>
  );
}
