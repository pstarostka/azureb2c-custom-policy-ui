import {
  AzureThemeDark,
  AzureThemeHighContrastDark,
  AzureThemeLight,
} from '@fluentui/azure-themes';
import {
  DefaultButton,
  IStackStyles,
  IStackTokens,
  PrimaryButton,
  Stack,
  Theme,
} from '@fluentui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface NavbarProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  setTheme,
}: NavbarProps) => {
  const stackTokens: IStackTokens = { childrenGap: 15 };
  const navigate = useNavigate();

  const stackStyles: Partial<IStackStyles> = {
    root: {
      padding: '0 10px',
      textAlign: 'center',
      height: '40px',
      alignItems: 'center',
      ...(theme !== AzureThemeDark &&
        theme !== AzureThemeHighContrastDark && {
          background: theme.palette.themePrimary,
        }),
    },
  };
  return (
    <Stack
      tokens={stackTokens}
      horizontal
      horizontalAlign="space-between"
      styles={stackStyles}
    >
      <Stack horizontal tokens={stackTokens}>
        <Stack.Item>
          <PrimaryButton
            text="Home"
            onClick={() => {
              navigate('/');
            }}
          />
        </Stack.Item>
        <Stack.Item>
          <PrimaryButton
            text="About"
            onClick={() => {
              navigate('/about');
            }}
          />
        </Stack.Item>
        <Stack.Item>
          <PrimaryButton
            text="One"
            onClick={() => {
              setTheme(AzureThemeDark);
            }}
          />
        </Stack.Item>
        <Stack.Item>
          <PrimaryButton
            style={{ height: '100%' }}
            text="Two"
            onClick={() => {
              setTheme(AzureThemeLight);
            }}
          />
        </Stack.Item>
      </Stack>
      <Stack.Item>
        <DefaultButton text="end" />
      </Stack.Item>
    </Stack>
  );
};

export default Navbar;
