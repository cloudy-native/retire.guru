import {
  Badge,
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const RetirementHero = () => {
  const bgGradient = "linear(to-br, teal.50, blue.50, purple.50)";
  const headingColor = "gray.800";
  const accentColor = "teal.500";
  const highlightColor = "blue.500";
  const textColor = "gray.700";
  const cardBg = "white";
  const boxShadow = "lg";

  return (
    <Box
      bgGradient={bgGradient}
      pt={{ base: 12, md: 16 }}
      pb={{ base: 8, md: 12 }}
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      position="relative"
      overflow="hidden"
    >
      {/* Decorative element */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg="teal.50"
        filter="blur(70px)"
        opacity="0.6"
        zIndex="0"
      />

      <Container maxW="container.xl" position="relative" zIndex="1">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: 8, md: 12 }}
        >
          <VStack
            spacing={5}
            align={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "left" }}
            maxW={{ base: "100%", md: "60%" }}
          >
            <HStack>
              <Badge
                colorScheme="teal"
                fontSize="sm"
                fontWeight="bold"
                px={3}
                py={1}
                borderRadius="full"
              >
                FREE TOOL
              </Badge>
            </HStack>

            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="extrabold"
              color={headingColor}
              lineHeight="1.1"
            >
              Will Your Savings{" "}
              <Box as="span" color={accentColor}>
                Last
              </Box>{" "}
              in Retirement?
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="xl"
              lineHeight="1.6"
            >
              Calculate how long your 401(k) and Social Security will sustain
              your desired lifestyle.{" "}
              <Box as="span" fontWeight="semibold" color={highlightColor}>
                Plan with confidence.
              </Box>
            </Text>

            <Text fontSize="sm" color={textColor} fontStyle="italic">
              Adjust the variables below to find your optimal withdrawal
              strategy
            </Text>
          </VStack>

          <Box
            bg={cardBg}
            borderRadius="xl"
            p={6}
            boxShadow={boxShadow}
            width={{ base: "100%", md: "35%" }}
            borderWidth="1px"
            borderColor="gray.200"
          >
            <VStack spacing={4} align="flex-start">
              <HStack>
                <Box
                  as="span"
                  fontSize="3xl"
                  color={accentColor}
                  fontWeight="bold"
                >
                  4%
                </Box>
                <Text fontWeight="medium">
                  The recommended safe withdrawal rate from your retirement
                  savings
                </Text>
              </HStack>

              <HStack>
                <Box
                  as="span"
                  fontSize="3xl"
                  color={accentColor}
                  fontWeight="bold"
                >
                  30+
                </Box>
                <Text fontWeight="medium">
                  Years of retirement our calculator can help you plan for
                </Text>
              </HStack>

              <Text fontSize="sm" color={textColor} mt={2}>
                For informational purposes only. Always consult a financial
                professional before making investment decisions.
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default RetirementHero;
