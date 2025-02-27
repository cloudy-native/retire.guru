import React from "react";
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Flex,
  Divider,
  Button,
  Input,
  IconButton
} from "@chakra-ui/react";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link as GatsbyLink } from "gatsby";

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
      bg={useColorModeValue("neutral.100", "neutral.800")}
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
        bg: useColorModeValue("primary.500", "primary.400"),
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

const NewFooter = () => {
  const bgColor = useColorModeValue("neutral.50", "neutral.900");
  const borderColor = useColorModeValue("neutral.200", "neutral.700");
  const textColor = useColorModeValue("neutral.700", "neutral.300");
  
  return (
    <Box
      as="footer"
      bg={bgColor}
      color={textColor}
      borderTop="1px"
      borderColor={borderColor}
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
              Helping you plan a secure financial future with confidence.
              Our retirement calculators make complex financial planning simple.
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
            <Link as={GatsbyLink} to="/calculator">Retirement Calculator</Link>
            <Link as={GatsbyLink} to="/social-security">Social Security</Link>
            <Link as={GatsbyLink} to="/401k">401(k) Planning</Link>
            <Link as={GatsbyLink} to="/ira">IRA Options</Link>
          </Stack>
          
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link as={GatsbyLink} to="/about">About Us</Link>
            <Link as={GatsbyLink} to="/blog">Blog</Link>
            <Link as={GatsbyLink} to="/contact">Contact Us</Link>
            <Link as={GatsbyLink} to="/privacy">Privacy Policy</Link>
          </Stack>
          
          <Stack align={"flex-start"}>
            <ListHeader>Stay Updated</ListHeader>
            <Text>Subscribe to our newsletter for the latest retirement planning tips.</Text>
            <Stack direction={"row"} width="full">
              <Input
                placeholder={"Your email address"}
                bg={useColorModeValue("white", "neutral.800")}
                border={1}
                borderColor={borderColor}
                _focus={{
                  borderColor: "primary.500",
                }}
              />
              <IconButton
                colorScheme="primary"
                aria-label="Subscribe"
                icon={<ArrowForwardIcon />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container> 
      
      <Divider borderColor={borderColor} />
      
      <Box py={4}>
        <Text pt={2} fontSize={"sm"} textAlign={"center"}>
          © {new Date().getFullYear()} retire.guru. All rights reserved.
        </Text>
      </Box> 
    </Box>
  );
};

export default NewFooter;