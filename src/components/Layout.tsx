import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import NewFooter from "./NewFooter";
import NewHeader from "./NewHeader";
import Footer from "./Footer";

function AppBackground({ children }) {
  // Choose different background patterns for light and dark modes
  const backgroundImage = useColorModeValue(
    "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h4v4H0V0zm8 0h4v4H8V0zm8 0h4v4h-4V0zM4 4h4v4H4V4zm8 0h4v4h-4V4zM0 8h4v4H0V8zm16 0h4v4h-4V8zM4 12h4v4H4v-4zm8 0h4v4h-4v-4z\" fill=\"%234299E1\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
    "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h4v4H0V0zm8 0h4v4H8V0zm8 0h4v4h-4V0zM4 4h4v4H4V4zm8 0h4v4h-4V4zM0 8h4v4H0V8zm16 0h4v4h-4V8zM4 12h4v4H4v-4zm8 0h4v4h-4v-4z\" fill=\"%234299E1\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')"
  );
  
  // Choose different background colors for light and dark modes
  const backgroundColor = useColorModeValue("white", "gray.800");
  
  return (
    <Box
      minH="100vh"
      backgroundImage={backgroundImage}
      backgroundRepeat="repeat"
      backgroundColor={backgroundColor}
      transition="background-color 0.2s"
    >
      {children}
    </Box>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppBackground>

    <Flex direction="column" minH="100vh">
      <NewHeader />
      <Box as="main" flex="1" width="100%">
        {children}
      </Box>
      <NewFooter />
    </Flex>
    </AppBackground>
  );
};

export default Layout;