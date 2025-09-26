import {
	Box,
	Container,
	Divider,
	Link,
	SimpleGrid,
	Stack,
	Text,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import React from "react";

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
					</Stack>

					<Stack align={"flex-start"}>
						<Text fontSize={"sm"}>
							We are not financial planners or advisors. This site is for
							educational purposes only. Always consult with a qualified
							financial advisor before making any financial decisions.
						</Text>
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
						<Text as="span" color="neutral.500">
							•
						</Text>
						<Text pt={2} fontSize={"sm"} textAlign="center">
							Made with ❤️ by{" "}
							<Link
								href="https://www.linkedin.com/in/stephenharrison"
								isExternal
							>
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
