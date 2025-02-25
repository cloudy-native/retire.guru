import {
  Box,
  Container,
  Flex,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Flex direction="column" minH="100vh">
      {/* Header */}
      <Box
        as="header"
        bg={useColorModeValue("white", "gray.800")}
        borderBottom="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        py={4}
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Text as="h1" fontSize="xl" fontWeight="bold">
              <Link href="/" _hover={{ textDecoration: "none" }}>
                My Gatsby Site
              </Link>
            </Text>
            <Flex gap={4}>
              <Link href="/" _hover={{ color: "blue.500" }}>
                Home
              </Link>
              <Link href="/about" _hover={{ color: "blue.500" }}>
                About
              </Link>
              <Link href="/contact" _hover={{ color: "blue.500" }}>
                Contact
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Main content */}
      <Box as="main" flex="1">
        {children}
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        bg={useColorModeValue("gray.50", "gray.900")}
        borderTop="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        py={6}
      >
        <Container maxW="container.xl">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify="space-between"
            align="center"
          >
            <Text>
              © {new Date().getFullYear()} My Gatsby Site. All rights reserved.
            </Text>
            <Stack direction="row" spacing={6}>
              <Link
                href="https://twitter.com"
                isExternal
                _hover={{ color: "blue.500" }}
              >
                Twitter
              </Link>
              <Link
                href="https://github.com"
                isExternal
                _hover={{ color: "blue.500" }}
              >
                GitHub
              </Link>
              <Link
                href="https://linkedin.com"
                isExternal
                _hover={{ color: "blue.500" }}
              >
                LinkedIn
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Flex>
  );
};

export default Layout;
