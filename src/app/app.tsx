import { AzureThemeDark, AzureThemeLight } from '@fluentui/azure-themes';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Stack, Theme, ThemeProvider } from '@fluentui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ClaimsList } from 'src/components';
import { ClaimType } from 'src/interfaces/building-blocks';
import Navbar from './navbar';
import { useDefaultTrustFrameworkBase } from './xml-parser';

export const App: React.FC = () => {
  const [claims, setClaims] = useState<ClaimType[]>([]);
  const base = useDefaultTrustFrameworkBase();
  useEffect(() => {
    initializeIcons();
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme(AzureThemeDark);
    }
  }, []);

  useEffect(() => {
    if (!base) return;

    const claimTypes =
      base.TrustFrameworkPolicy.BuildingBlocks.ClaimsSchema.ClaimType;
    setClaims(claimTypes);
  }, [base]);

  const [theme, setTheme] = useState<Theme>(AzureThemeLight);

  const onRemoveClaim = useMemo(() => {
    // setClaims([]);
  }, []);
  const a = () => {
    console.log('');
  };

  return (
    <ThemeProvider theme={theme} style={{ height: '100%' }}>
      <Stack>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route
            path="/"
            element={
              <ClaimsList claims={claims} onAddClaim={a} onRemoveClaim={a} />
            }
          ></Route>
        </Routes>
      </Stack>
    </ThemeProvider>
  );
};

export default App;
