import {
	Box,
	Container,
	Flex,
	Heading,
	Icon,
	SimpleGrid,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import {
	FaCalculator,
	FaChartLine,
	FaHandHoldingUsd,
	FaRegLightbulb,
} from "react-icons/fa";

const AboutHero = () => {
	const bgGradient = "linear(to-b, blue.50, white)";
	const accentColor = "blue.600";
	const textColor = "gray.700";

	return (
		<Box
			bg={"blue.50"}
			bgGradient={bgGradient}
			pt={16}
			pb={10}
			borderBottomWidth="1px"
			borderBottomColor={"gray.200"}
		>
			<Stack spacing={6} textAlign="center">
				<Heading
					as="h1"
					fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
					fontWeight="bold"
					color={accentColor}
					lineHeight="1.2"
				>
					About Retire.Guru
				</Heading>

				<Text
					fontSize={{ base: "md", md: "lg" }}
					color={textColor}
					maxW="3xl"
					mx="auto"
					lineHeight="1.8"
				>
					Empowering your retirement journey with clarity, confidence, and
					innovative financial tools.
				</Text>
			</Stack>
		</Box>
	);
};

const Feature = ({ title, text, icon }) => {
	const bgColor = "white";
	const borderColor = "gray.200";

	return (
		<Box
			p={5}
			shadow="md"
			borderWidth="1px"
			borderRadius="lg"
			bg={bgColor}
			borderColor={borderColor}
			transition="transform 0.3s"
			_hover={{
				transform: "translateY(-5px)",
				shadow: "lg",
			}}
		>
			<Flex
				w={16}
				h={16}
				align="center"
				justify="center"
				color={"blue.500"}
				rounded="full"
				bg={"blue.50"}
				mb={4}
			>
				<Icon as={icon} w={8} h={8} />
			</Flex>
			<Heading fontSize="xl" mb={2}>
				{title}
			</Heading>
			<Text color={"gray.600"}>{text}</Text>
		</Box>
	);
};

// TeamMember component removed (solo project)

const AboutPage: React.FC<PageProps> = () => {
	const textColor = "gray.700";
	const sectionBg = "gray.50";

	return (
		<>
			<AboutHero />

			<Container maxW="6xl" py={12}>
				<VStack spacing={12}>
					{/* Our Mission */}
					<Box w="full">
						<Heading
							as="h2"
							size="lg"
							mb={6}
							textAlign="center"
							color={"blue.600"}
						>
							Our Mission
						</Heading>

						<Text
							fontSize="lg"
							lineHeight="tall"
							textAlign="center"
							maxW="3xl"
							mx="auto"
							color={textColor}
						>
							We believe everyone deserves a secure and fulfilling retirement.
							Our mission is to demystify retirement planning through intuitive
							tools, data-driven insights, and accessible financial education.
						</Text>
					</Box>

					{/* What Sets Retire.Guru Apart */}
					<Box w="full" py={10} bg={sectionBg} borderRadius="lg">
						<Container maxW="5xl">
							<Heading
								as="h2"
								size="lg"
								mb={10}
								textAlign="center"
								color={"blue.600"}
							>
								What Sets Retire.Guru Apart
							</Heading>

							<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
								<Feature
									icon={FaCalculator}
									title="Intelligent Calculators"
									text="Our financial tools go beyond basic math to provide nuanced retirement insights tailored to your unique situation."
								/>
								<Feature
									icon={FaChartLine}
									title="Visual Analytics"
									text="Complex financial concepts translated into intuitive visuals that help you understand your retirement trajectory at a glance."
								/>
								<Feature
									icon={FaHandHoldingUsd}
									title="Holistic Planning"
									text="We consider all aspects of retirement finances — from Social Security optimization to healthcare costs and longevity risk."
								/>
								<Feature
									icon={FaRegLightbulb}
									title="Educational Approach"
									text="Empowering you with knowledge through clear explanations that build your financial confidence for independent decision-making."
								/>
							</SimpleGrid>
						</Container>
					</Box>

					{/* Our Story */}
					<Box w="full" my={6}>
						<Heading
							as="h2"
							size="lg"
							mb={6}
							textAlign="center"
							color={"blue.600"}
						>
							Our Story
						</Heading>

						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							Retire.Guru was created after seeing firsthand how traditional
							retirement planning tools often fell short. With a background in
							technology and a passion for financial clarity, we set out to
							build tools that make complex retirement questions understandable.
						</Text>

						<Text fontSize="md" lineHeight="tall" mb={4} color={textColor}>
							What began as a simple calculator has evolved into a comprehensive
							set of tools that help people understand their retirement options
							with clarity. These tools have helped individuals optimize Social
							Security decisions, determine sustainable withdrawal rates, and
							build confidence in their plans.
						</Text>

						<Text fontSize="md" lineHeight="tall" color={textColor}>
							Today, we continue to refine these calculators based on the latest
							research and user feedback, always with the goal of making
							retirement planning more accessible, accurate, and actionable for
							everyone.
						</Text>
					</Box>
				</VStack>
			</Container>
		</>
	);
};

export default AboutPage;

export const Head: HeadFC = () => <title>About Us | Retire.Guru</title>;
