import { Link, graphql, type HeadFC } from "gatsby";
import {
	Box,
	Container,
	Heading,
	Text,
	Button,
	VStack,
	Image,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";

const BlogPostTemplate = ({ data }: { data: Queries.BlogPostBySlugQuery }) => {
	const post = data.markdownRemark;
	const accentColor = "blue.600";

	return (
		<Container maxW="4xl" py={10}>
			<VStack spacing={8} align="stretch">
				<article>
					<header>
						<Heading as="h1" mb={2} color={accentColor}>
							{post.frontmatter.title}
						</Heading>
						<Text fontSize="sm" color="gray.500">
							{post.frontmatter.date} • {Math.ceil(post.wordCount.words / 200)}{" "}
							min read
						</Text>
						<Text fontSize="sm" color="gray.600" mb={8}>
							{post.frontmatter.author || "Retire.Guru Team"}
						</Text>
					</header>
					{post.frontmatter.featuredImage?.publicURL && (
						<Image
							src={post.frontmatter.featuredImage.publicURL}
							alt={post.frontmatter.title}
							borderRadius="lg"
							w="100%"
							h="auto"
							objectFit="contain"
							mb={8}
						/>
					)}
					<Box
						className="blog-content"
						sx={{
							"h2, h3, h4, h5, h6": {
								mt: 8,
								mb: 4,
								fontWeight: "bold",
							},
							p: {
								mb: 4,
							},
							ul: {
								pl: 8,
								mb: 4,
							},
							li: {
								mb: 2,
							},
							blockquote: {
								pl: 4,
								borderLeftWidth: "4px",
								borderLeftColor: accentColor,
								fontStyle: "italic",
								mb: 4,
							},
						}}
					>
						<ReactMarkdown remarkPlugins={[remarkGfm]}>
							{post.rawMarkdownBody}
						</ReactMarkdown>
					</Box>
				</article>

				<Box>
					<Button as={Link} to="/blog" colorScheme="blue" variant="outline">
						Back to Blog
					</Button>
				</Box>
			</VStack>
		</Container>
	);
};

export default BlogPostTemplate;

export const Head: HeadFC<Queries.BlogPostBySlugQuery> = ({ data }) => {
	const post = data.markdownRemark;
	const siteTitleSuffix = "Retire Guru";
	const title = post?.frontmatter?.title
		? `${siteTitleSuffix} | ${post.frontmatter.title} `
		: siteTitleSuffix;
	const description =
		post?.frontmatter?.description ??
		post?.excerpt ??
		"Insights and guidance from Retire.Guru.";
	const image = post?.frontmatter?.featuredImage?.publicURL ?? undefined;

	return (
		<>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			{image ? <meta property="og:image" content={image} /> : null}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			{image ? <meta name="twitter:image" content={image} /> : null}
		</>
	);
};

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      rawMarkdownBody
      wordCount { words }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        author
        featuredImage { publicURL }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
