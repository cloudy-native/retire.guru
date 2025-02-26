import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  IconButton,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const Header = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
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
            retire.guru
          </Link>
        </Text>
        <Flex gap={4} align="center"> {/* Added align="center" here */}
          <Link href="/" _hover={{ color: "blue.500" }}>
            Home
          </Link>
          <Link href="/about" _hover={{ color: "blue.500" }}>
            About
          </Link>
          <Link href="/contact" _hover={{ color: "blue.500" }}>
            Contact
          </Link>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="md"
          />
        </Flex>
      </Flex>
    </Container>
  </Box>
  );
};

export default Header;
