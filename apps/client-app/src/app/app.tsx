import { AzureThemeLight } from '@fluentui/azure-themes';
import { Stack, Theme, ThemeProvider } from '@fluentui/react';
import { useState } from 'react';
import Navbar from './navbar';
import XmlViewer from './xml-viewer';

export function App() {
  const [theme, setTheme] = useState<Theme>(AzureThemeLight);
  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Navbar theme={theme} setTheme={setTheme} />

        <XmlViewer />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
