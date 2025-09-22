import * as React from "react";
import { Link } from "gatsby";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  VStack,
  HStack,
  Tag,
  Avatar,
  Flex,
  Button,
  Image,
} from "@chakra-ui/react";

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

const BlogPostCard = ({ post }) => {
  const cardBg = "white";
  const borderColor = "gray.200";
  const textColor = "gray.700";
  const tagBg = "blue.50";

  // Image handling removed for simplicity

  return (
    <Box
      as={Link}
      to={post.fields.slug}
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
        <VStack align="start" spacing={4}>
          {post.frontmatter.featuredImage?.publicURL && (
            <Image
              src={post.frontmatter.featuredImage.publicURL}
              alt={post.frontmatter.title}
              borderRadius="md"
              w="full"
              maxH="200px"
              objectFit="contain"
              height="auto"
            />
          )}

          <Heading as="h3" fontSize="xl" lineHeight="tight">
            {post.frontmatter.title}
          </Heading>

          <Text color={textColor} noOfLines={3}>
            {post.frontmatter.description || post.excerpt}
          </Text>

          {post.frontmatter.tags && (
            <HStack spacing={2} mt={2} wrap="wrap">
              {post.frontmatter.tags.map((tag) => (
                <Tag key={tag} size="sm" bg={tagBg} my={1}>
                  {tag}
                </Tag>
              ))}
            </HStack>
          )}

          <Flex justify="space-between" align="center" w="full" mt={2}>
            <Text fontSize="sm" fontWeight="medium">
              {post.frontmatter.author || "Retire.Guru Team"}
            </Text>
            <Text
              fontSize="sm"
              color={"gray.500"}
            >
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

const BlogListTemplate = ({ data, pageContext }) => {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? "/blog" : `/blog/${currentPage - 1}`;
  const nextPage = `/blog/${currentPage + 1}`;
  const posts = data.allMarkdownRemark.edges;

  // Colors
  const accentColor = "blue.600";

  return (
    <>
      <BlogHero />

      <Container maxW="6xl" py={12}>
        <VStack spacing={10} align="stretch">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {posts.map(({ node }) => (
              <BlogPostCard key={node.fields.slug} post={node} />
            ))}
          </SimpleGrid>

          {numPages > 1 && (
            <Flex justify="space-between" mt={10}>
              {!isFirst && (
                <Button
                  as={Link}
                  to={prevPage}
                  colorScheme="blue"
                  variant="outline"
                >
                  ← Previous Page
                </Button>
              )}
              {!isLast && (
                <Button
                  as={Link}
                  to={nextPage}
                  colorScheme="blue"
                  variant="outline"
                  ml="auto"
                >
                  Next Page →
                </Button>
              )}
            </Flex>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default BlogListTemplate;

// Note: This is a presentational template; no page query is exported here.
