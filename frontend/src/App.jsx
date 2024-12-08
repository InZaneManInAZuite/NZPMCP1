import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Router from './Router';
import { Theme } from './Theme';


export default function App() {
  return (
    <MantineProvider theme={Theme}>
      <Router />
    </MantineProvider>
  );
}
