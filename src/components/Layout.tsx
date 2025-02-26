import { Box, Flex, useColorMode } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex direction="column" minH="100vh">
      <Header />

      <Box as="main" flex="1">
        {children}
      </Box>

      <Footer />
    </Flex>
  );
};

export default Layout;
