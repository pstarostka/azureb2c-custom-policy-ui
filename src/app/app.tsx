import { AzureThemeLight } from '@fluentui/azure-themes';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Stack, Theme, ThemeProvider } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { ClaimsList } from 'src/components';
import Navbar from './navbar';
import { getDefaultTrustFrameworkBase } from './xml-parser';

export function App() {
  useEffect(() => {
    initializeIcons();
  }, []);

  const [theme, setTheme] = useState<Theme>(AzureThemeLight);
  const a = getDefaultTrustFrameworkBase();
  const claims = a.TrustFrameworkPolicy.BuildingBlocks.ClaimsSchema.ClaimType;

  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Navbar theme={theme} setTheme={setTheme} />
        <ClaimsList {...{ claims }} />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
