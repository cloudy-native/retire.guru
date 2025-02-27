import {
  Box,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import React from "react";

const Footer = (): JSX.Element => {
  return (
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
            © {new Date().getFullYear()} retire.guru. All rights reserved.
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
  );
};

export default Footer;
