import {
  Box,
  Container,
  Divider,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  chakra,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import BuyMeCoffeeButton from "./BuyMeCoffeeButton";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg="neutral.100"
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: "primary.500",
        color: "white",
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text fontWeight={"600"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="neutral.50"
      color="neutral.700"
      borderTop="1px"
      borderColor="neutral.200"
    >
      <Container as={Stack} maxW={"container.xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Text
                as={GatsbyLink}
                to="/"
                fontFamily={"heading"}
                fontWeight="bold"
                fontSize="xl"
                color="primary.500"
              >
                retire.guru
              </Text>
            </Box>
            <Text fontSize={"sm"}>
              Helping you plan a secure financial future with confidence. Our
              retirement calculators make complex financial planning simple.
            </Text>
            <Stack direction={"row"} spacing={4}>
              <SocialButton label={"Twitter"} href={"https://twitter.com"}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={"LinkedIn"} href={"https://linkedin.com"}>
                <FaLinkedin />
              </SocialButton>
              <SocialButton label={"Facebook"} href={"https://facebook.com"}>
                <FaFacebook />
              </SocialButton>
            </Stack>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Resources</ListHeader>
            <Link as={GatsbyLink} to="/calculator">
              Retirement Calculator
            </Link>
            <Link as={GatsbyLink} to="/social-security">
              Social Security
            </Link>
            <Link as={GatsbyLink} to="/401k">
              401(k) Planning
            </Link>
            <Link as={GatsbyLink} to="/ira">
              IRA Options
            </Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link as={GatsbyLink} to="/blog">
              Blog
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>

      <Divider borderColor="neutral.200" />

      <Box py={4}>
        <Stack align="center" spacing={2}>
          <Stack direction="row" spacing={3} align="center" justify="center">
            <Text pt={2} fontSize={"sm"} textAlign="center">
              © {new Date().getFullYear()} retire.guru. All rights reserved.
            </Text>
            <Text as="span" color="neutral.500">•</Text>
            <Text pt={2} fontSize={"sm"} textAlign="center">
              Made with ❤️ by {" "}
              <Link href="https://www.linkedin.com/in/stephenharrison" isExternal>
                Stephen Harrison
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
