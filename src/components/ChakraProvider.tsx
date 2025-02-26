import React, { ReactNode } from 'react';
import { ChakraProvider as ChakraUIProvider, extendTheme } from '@chakra-ui/react';

// Extend the theme with Chakra UI v2 style
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'system-ui, sans-serif',
    body: 'system-ui, sans-serif',
  },
  colors: {
    brand: {
      50: '#e6f6ff',
      100: '#b3e0ff',
      200: '#80cbff',
      300: '#4db5ff',
      400: '#1a9fff',
      500: '#0088e6',
      600: '#006bb4',
      700: '#004d82',
      800: '#003050',
      900: '#00121f',
    },
  },
});

interface ChakraProviderProps {
  children: ReactNode;
}

export const ChakraProvider = ({ children }: ChakraProviderProps): JSX.Element => {
  return (
    <ChakraUIProvider theme={theme}>
      {children}
    </ChakraUIProvider>
  );
};