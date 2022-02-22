import { getDefaultTrustFrameworkBase } from '@azure-b2c-custom-policy-ui/b2c-parser';
import {
  ClaimsList,
  ClaimsListExample,
} from '@azure-b2c-custom-policy-ui/b2c-parser/components';
import { AzureThemeLight } from '@fluentui/azure-themes';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Stack, Theme, ThemeProvider } from '@fluentui/react';
import { useEffect, useState } from 'react';
import Navbar from './navbar';
import XmlViewer from './xml-viewer';

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
        <ClaimsListExample />
        <XmlViewer />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
