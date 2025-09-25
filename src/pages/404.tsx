import {
	Box,
	Button,
	Link as ChakraLink,
	Heading,
	Text,
} from "@chakra-ui/react";
import type { HeadFC, PageProps } from "gatsby";
import { Link } from "gatsby";
import type { FC } from "react";

const NotFoundPage: FC<PageProps> = () => {
	return (
		<Box p={24} fontFamily="-apple-system, Roboto, sans-serif, serif">
			<Heading as="h1" mt={0} mb={16} maxW="container.sm">
				Page not found
			</Heading>
			<Text mb={12}>
				Sorry 😔, we couldn’t find what you were looking for.
				<br />
				<Button>
					<ChakraLink as={Link} to="/">
						Go home
					</ChakraLink>
				</Button>
			</Text>
		</Box>
	);
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
