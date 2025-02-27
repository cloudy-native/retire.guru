import React from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  Button,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

const RetirementHero = () => {
  const bgGradient = useColorModeValue(
    "linear(to-b, blue.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );

  const accentColor = useColorModeValue("blue.600", "blue.300");
  const textColor = useColorModeValue("gray.700", "gray.100");

  return (
    <Box
      bg={useColorModeValue("blue.50", "gray.900")}
      bgGradient={bgGradient}
      pt={16}
      pb={10}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Stack spacing={6} textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={accentColor}
          lineHeight="1.2"
        >
          How to Maximize Your 401(k) in Retirement
        </Heading>

        <Text
          fontSize={{ base: "ms", md: "lg" }}
          color={textColor}
          maxW="3xl"
          mx="auto"
          lineHeight="1.8"
        >
          Welcome to our 401(k) Withdrawal Calculator – designed specifically
          for those approaching or already enjoying retirement. After years of
          disciplined saving, you now face an important question: how much can
          you safely withdraw from your 401(k) while making your savings last?
        </Text>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={textColor}
          maxW="3xl"
          mx="auto"
          lineHeight="1.8"
        >
          This calculator helps you determine a sustainable withdrawal strategy
          that complements your Social Security benefits. By analyzing your
          current 401(k) balance, expected investment returns during retirement,
          and desired lifestyle, you'll gain clarity on creating a reliable
          income stream for your golden years.
        </Text>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={textColor}
          maxW="3xl"
          mx="auto"
          lineHeight="1.8"
        >
          Explore different withdrawal rates to find the right balance between
          enjoying retirement today and ensuring financial security tomorrow.
        </Text>

        <Heading
          as="h1"
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontWeight="bold"
          color={accentColor}
          lineHeight="1.2"
        >
          Important Disclaimer
        </Heading>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={textColor}
          maxW="3xl"
          mx="auto"
          lineHeight="1.8"
        >
          This is for informational purposes only. We are not accountants or
          lawyers. You must consult a professional before making decisions about
          managing your money in retirement. We're just good with numbers and
          making interesting websites.
        </Text>
      </Stack>
    </Box>
  );
};

export default RetirementHero;
