import {
	Avatar,
	Box,
	Container,
	Flex,
	Heading,
	HStack,
	SimpleGrid,
	Stack,
	Tag,
	Text,
	VStack,
	Image,
} from "@chakra-ui/react";
import { Link as GatsbyLink, HeadFC, PageProps, graphql } from "gatsby";
import * as React from "react";

const BlogHero = () => {
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
					Retire.Guru Blog
				</Heading>

				<Text
					fontSize={{ base: "md", md: "lg" }}
					color={textColor}
					maxW="3xl"
					mx="auto"
					lineHeight="1.8"
				>
					Insights, strategies, and updates to help you navigate your retirement
					journey.
				</Text>
			</Stack>
		</Box>
	);
};

interface BlogPostCardProps {
	title: string;
	excerpt: string;
	date: string;
	author: {
		name: string;
		avatar?: string;
	};
	slug: string;
	tags?: string[];
	isFeatured?: boolean;
	imageUrl?: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
	title,
	excerpt,
	date,
	author,
	slug,
	tags = [],
	isFeatured = false,
	imageUrl,
}) => {
	const cardBg = "white";
	const borderColor = "gray.200";
	const textColor = "gray.700";
	const tagBg = "blue.50";

	return (
		<Box
			as={GatsbyLink}
			to={slug}
			display="block"
			_hover={{ textDecoration: "none" }}
		>
			<Box
				p={6}
				h="full"
				bg={cardBg}
				borderWidth="1px"
				borderColor={borderColor}
				borderRadius="lg"
				shadow="md"
				transition="all 0.3s"
				position="relative"
				_hover={{
					transform: "translateY(-4px)",
					shadow: "lg",
					borderColor: "blue.300",
				}}
			>
				{isFeatured && (
					<Tag
						position="absolute"
						top={3}
						right={3}
						colorScheme="blue"
						size="sm"
					>
						Featured
					</Tag>
				)}

				<Flex
					gap={5}
					align={{ base: "stretch", md: "center" }}
					direction={{ base: "column", sm: "row" }}
				>
					{imageUrl && (
						<Box
							flexShrink={0}
							w={{ base: "100%", sm: "140px" }}
							h={{ base: "180px", sm: "140px" }}
							bg="gray.50"
							borderRadius="md"
							borderWidth="1px"
							borderColor="gray.200"
							overflow="hidden"
						>
							<Image
								src={imageUrl}
								alt={title}
								w="100%"
								h="100%"
								objectFit="contain"
							/>
						</Box>
					)}

					<VStack align="start" spacing={4} flex={1}>
						<Heading as="h3" fontSize="xl" lineHeight="tight">
							{title}
						</Heading>

						<Text color={textColor} noOfLines={3}>
							{excerpt}
						</Text>

						<HStack spacing={2} mt={2} wrap="wrap">
							{tags.map((tag) => (
								<Tag key={tag} size="sm" bg={tagBg} my={1}>
									{tag}
								</Tag>
							))}
						</HStack>

						<Flex justify="space-between" align="center" w="full" mt={2}>
							<HStack>
								<Avatar name={author.name} src={author.avatar} size="xs" />
								<Text fontSize="sm" fontWeight="medium">
									{author.name}
								</Text>
							</HStack>
							<Text fontSize="sm" color={"gray.500"}>
								{date}
							</Text>
						</Flex>
					</VStack>
				</Flex>
			</Box>
		</Box>
	);
};

const BlogPage: React.FC<
	PageProps<{ allMarkdownRemark: { nodes: any[] } }>
> = ({ data }) => {
	const posts = data.allMarkdownRemark.nodes;

	return (
		<>
			<BlogHero />

			<Container maxW="6xl" py={12}>
				<VStack spacing={10} align="stretch">
					{posts.length === 0 ? (
						<Text textAlign="center" fontSize="lg">
							No blog posts found. Check back soon!
						</Text>
					) : (
						<SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
							{posts.map((post) => (
								<BlogPostCard
									key={post.fields.slug}
									title={post.frontmatter.title}
									excerpt={post.frontmatter.description || post.excerpt}
									date={new Date(post.frontmatter.date).toLocaleDateString(
										"en-US",
										{
											year: "numeric",
											month: "long",
											day: "numeric",
										},
									)}
									author={{ name: post.frontmatter.author || "Retire.Guru" }}
									slug={post.fields.slug}
									tags={post.frontmatter.tags}
									isFeatured={false}
									imageUrl={post.frontmatter.featuredImage?.publicURL}
								/>
							))}
						</SimpleGrid>
					)}
				</VStack>
			</Container>
		</>
	);
};

export default BlogPage;

export const Head: HeadFC = () => <title>Retire Guru | Blog</title>;

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt(pruneLength: 160)
        fields { slug }
        frontmatter {
          title
          date
          description
          author
          tags
          featuredImage { publicURL }
        }
      }
    }
  }
`;
