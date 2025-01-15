import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import UserContextProvider from './context/UserContextProvider';
import Router from './Router';
import { Theme } from './Theme';
import CompetitionContextProvider from "./context/CompetitionContextProvider.jsx";
import AppShellContextProvider from "./context/AppShellContextProvider.jsx";
import AttemptContextProvider from "./context/AttemptContextProvider.jsx";
import ReportContextProvider from "./context/ReportContextProvider.jsx";


export default function App() {
  return (
      <AppShellContextProvider>
          <UserContextProvider>
              <AttemptContextProvider>
                  <CompetitionContextProvider>
                      <ReportContextProvider>
                          <MantineProvider theme={Theme} defaultColorScheme='dark'>
                              <Router />
                          </MantineProvider>
                      </ReportContextProvider>
                  </CompetitionContextProvider>
              </AttemptContextProvider>
          </UserContextProvider>
      </AppShellContextProvider>
  );
}
