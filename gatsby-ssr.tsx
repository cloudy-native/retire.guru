import React from 'react';
import { ChakraProvider } from './src/components/ChakraProvider';
import Layout from './src/components/Layout';

// Wrap all pages with the ChakraProvider
export const wrapRootElement = ({ element }: { element: React.ReactNode }) => {
  return <ChakraProvider>{element}</ChakraProvider>;
};

// Wrap all pages with the Layout component
export const wrapPageElement = ({ element }: { element: React.ReactNode }) => {
  return <Layout>{element}</Layout>;
};