import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  SimpleGrid,
  Input,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  useColorMode,
  Badge,
  Tag,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Alert,
  AlertIcon,
  Container,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, InfoIcon, WarningIcon } from "@chakra-ui/icons";

const ThemeTest = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const headingColor = useColorModeValue("primary.600", "primary.400");
  const cardBg = useColorModeValue("white", "neutral.800");
  const borderColor = useColorModeValue("neutral.200", "neutral.700");

  return (
    <Container
      maxW="container.xl"
      py={8}
    >
      <Heading as="h1" mb={8} textAlign="center" size="2xl">
        Theme Test Component
      </Heading>

      <Flex mb={8} justifyContent="flex-end">
        <Button
          onClick={toggleColorMode}
          leftIcon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        >
          {colorMode === "light"
            ? "Switch to Dark Mode"
            : "Switch to Light Mode"}
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={8}>
        {/* Color Palette Section */}
        <Card bg={cardBg} shadow="md" borderRadius="lg" overflow="hidden">
          <CardHeader>
            <Heading as="h2" size="lg" color={headingColor}>
              Color Palette
            </Heading>
          </CardHeader>
          <CardBody>
            <Text mb={4}>Primary Colors (Sapphire)</Text>
            <SimpleGrid columns={5} spacing={2} mb={4}>
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (shade) => (
                  <Box
                    key={shade}
                    bg={`primary.${shade}`}
                    p={4}
                    borderRadius="md"
                  >
                    <Text
                      color={shade > 400 ? "white" : "black"}
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      {shade}
                    </Text>
                  </Box>
                )
              )}
            </SimpleGrid>

            <Text mb={4}>Secondary Colors (Emerald)</Text>
            <SimpleGrid columns={5} spacing={2} mb={4}>
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (shade) => (
                  <Box
                    key={shade}
                    bg={`secondary.${shade}`}
                    p={4}
                    borderRadius="md"
                  >
                    <Text
                      color={shade > 400 ? "white" : "black"}
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      {shade}
                    </Text>
                  </Box>
                )
              )}
            </SimpleGrid>

            <Text mb={4}>Accent Colors (Ruby)</Text>
            <SimpleGrid columns={5} spacing={2} mb={4}>
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (shade) => (
                  <Box
                    key={shade}
                    bg={`accent.${shade}`}
                    p={4}
                    borderRadius="md"
                  >
                    <Text
                      color={shade > 400 ? "white" : "black"}
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      {shade}
                    </Text>
                  </Box>
                )
              )}
            </SimpleGrid>

            <Text mb={4}>Neutral Colors</Text>
            <SimpleGrid columns={5} spacing={2}>
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                (shade) => (
                  <Box
                    key={shade}
                    bg={`neutral.${shade}`}
                    p={4}
                    borderRadius="md"
                  >
                    <Text
                      color={shade > 400 ? "white" : "black"}
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      {shade}
                    </Text>
                  </Box>
                )
              )}
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Typography Section */}
        <Card bg={cardBg} shadow="md" borderRadius="lg" overflow="hidden">
          <CardHeader>
            <Heading as="h2" size="lg" color={headingColor}>
              Typography
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              <Heading as="h1" size="2xl">
                Heading 2XL
              </Heading>
              <Heading as="h2" size="xl">
                Heading XL
              </Heading>
              <Heading as="h3" size="lg">
                Heading LG
              </Heading>
              <Heading as="h4" size="md">
                Heading MD
              </Heading>
              <Heading as="h5" size="sm">
                Heading SM
              </Heading>
              <Heading as="h6" size="xs">
                Heading XS
              </Heading>

              <Divider />

              <Text fontSize="2xl">Text 2XL</Text>
              <Text fontSize="xl">Text XL</Text>
              <Text fontSize="lg">Text LG</Text>
              <Text fontSize="md">Text MD (Default)</Text>
              <Text fontSize="sm">Text SM</Text>
              <Text fontSize="xs">Text XS</Text>
            </Stack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Buttons Section */}
      <Card bg={cardBg} shadow="md" borderRadius="lg" overflow="hidden" mb={8}>
        <CardHeader>
          <Heading as="h2" size="lg" color={headingColor}>
            Buttons
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={6}>
            <Heading as="h3" size="md">
              Button Variants
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              <Button colorScheme="primary">Primary</Button>
              <Button colorScheme="primary" variant="outline">
                Primary Outline
              </Button>
              <Button colorScheme="primary" variant="ghost">
                Primary Ghost
              </Button>
              <Button colorScheme="primary" variant="link">
                Primary Link
              </Button>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              <Button variant="secondary">Secondary</Button>
              <Button colorScheme="secondary" variant="outline">
                Secondary Outline
              </Button>
              <Button colorScheme="secondary" variant="ghost">
                Secondary Ghost
              </Button>
              <Button colorScheme="secondary" variant="link">
                Secondary Link
              </Button>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              <Button variant="accent">Accent</Button>
              <Button colorScheme="accent" variant="outline">
                Accent Outline
              </Button>
              <Button colorScheme="accent" variant="ghost">
                Accent Ghost
              </Button>
              <Button colorScheme="accent" variant="link">
                Accent Link
              </Button>
            </SimpleGrid>

            <Divider />

            <Heading as="h3" size="md">
              Button Sizes
            </Heading>
            <Stack direction="row" spacing={4} align="center">
              <Button colorScheme="primary" size="xs">
                XS
              </Button>
              <Button colorScheme="primary" size="sm">
                SM
              </Button>
              <Button colorScheme="primary" size="md">
                MD
              </Button>
              <Button colorScheme="primary" size="lg">
                LG
              </Button>
            </Stack>

            <Divider />

            <Heading as="h3" size="md">
              Button States
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              <Button colorScheme="primary" isLoading>
                Loading
              </Button>
              <Button colorScheme="primary" isDisabled>
                Disabled
              </Button>
              <Button colorScheme="primary" isActive>
                Active
              </Button>
              <Button colorScheme="primary" leftIcon={<InfoIcon />}>
                With Icon
              </Button>
            </SimpleGrid>
          </Stack>
        </CardBody>
      </Card>

      {/* Form Elements */}
      <Card bg={cardBg} shadow="md" borderRadius="lg" overflow="hidden" mb={8}>
        <CardHeader>
          <Heading as="h2" size="lg" color={headingColor}>
            Form Elements
          </Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Stack spacing={4}>
              <Heading as="h3" size="md">
                Inputs
              </Heading>
              <Input placeholder="Default input" />
              <Input
                placeholder="Focused input"
                focusBorderColor="primary.500"
              />
              <Input placeholder="Invalid input" isInvalid />
              <Input placeholder="Disabled input" isDisabled />
              <Textarea placeholder="Textarea" />

              <Divider />

              <Heading as="h3" size="md">
                Select / Options
              </Heading>
              <Stack spacing={4}>
                <Checkbox>Checkbox</Checkbox>
                <Checkbox isChecked>Checked</Checkbox>
                <Checkbox isDisabled>Disabled</Checkbox>
              </Stack>

              <RadioGroup defaultValue="1">
                <Stack spacing={4} direction="row">
                  <Radio value="1">Radio 1</Radio>
                  <Radio value="2">Radio 2</Radio>
                  <Radio value="3" isDisabled>
                    Disabled
                  </Radio>
                </Stack>
              </RadioGroup>

              <Switch />
            </Stack>

            <Stack spacing={4}>
              <Heading as="h3" size="md">
                Interactive Elements
              </Heading>

              <Tabs>
                <TabList>
                  <Tab>Tab 1</Tab>
                  <Tab>Tab 2</Tab>
                  <Tab>Tab 3</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <p>Tab 1 content</p>
                  </TabPanel>
                  <TabPanel>
                    <p>Tab 2 content</p>
                  </TabPanel>
                  <TabPanel>
                    <p>Tab 3 content</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Divider />

              <Heading as="h3" size="md">
                Tags & Badges
              </Heading>
              <Stack direction="row" spacing={2}>
                <Badge>Badge</Badge>
                <Badge colorScheme="primary">Primary</Badge>
                <Badge colorScheme="secondary">Secondary</Badge>
                <Badge colorScheme="accent">Accent</Badge>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Tag>Tag</Tag>
                <Tag colorScheme="primary">Primary</Tag>
                <Tag colorScheme="secondary">Secondary</Tag>
                <Tag colorScheme="accent">Accent</Tag>
              </Stack>

              <Divider />

              <Heading as="h3" size="md">
                Alerts
              </Heading>
              <Alert status="info">
                <AlertIcon />
                Information alert
              </Alert>
              <Alert status="success">
                <AlertIcon />
                Success alert
              </Alert>
              <Alert status="warning">
                <AlertIcon />
                Warning alert
              </Alert>
              <Alert status="error">
                <AlertIcon />
                Error alert
              </Alert>
            </Stack>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Table Example */}
      <Card bg={cardBg} shadow="md" borderRadius="lg" overflow="hidden" mb={8}>
        <CardHeader>
          <Heading as="h2" size="lg" color={headingColor}>
            Table
          </Heading>
        </CardHeader>
        <CardBody overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Header 1</Th>
                <Th>Header 2</Th>
                <Th isNumeric>Header 3</Th>
                <Th>Header 4</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Value 1A</Td>
                <Td>Value 2A</Td>
                <Td isNumeric>123</Td>
                <Td>Value 4A</Td>
              </Tr>
              <Tr>
                <Td>Value 1B</Td>
                <Td>Value 2B</Td>
                <Td isNumeric>456</Td>
                <Td>Value 4B</Td>
              </Tr>
              <Tr>
                <Td>Value 1C</Td>
                <Td>Value 2C</Td>
                <Td isNumeric>789</Td>
                <Td>Value 4C</Td>
              </Tr>
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Cards Example */}
      <Heading as="h2" size="lg" color={headingColor} mb={4}>
        Card Variations
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
        <Card>
          <CardHeader>
            <Heading size="md">Basic Card</Heading>
          </CardHeader>
          <CardBody>
            <Text>Standard card with header and body content.</Text>
          </CardBody>
        </Card>

        <Card variant="outline" borderColor={borderColor}>
          <CardHeader>
            <Heading size="md">Outlined Card</Heading>
          </CardHeader>
          <CardBody>
            <Text>Card with an outline border.</Text>
          </CardBody>
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        </Card>

        <Card variant="elevated" shadow="lg">
          <CardHeader>
            <Heading size="md">Elevated Card</Heading>
          </CardHeader>
          <CardBody>
            <Text>Card with elevation shadow.</Text>
          </CardBody>
          <CardFooter>
            <Button>Action</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>

      <Box textAlign="center" mt={12} mb={8}>
        <Text>
          Current color mode: <strong>{colorMode}</strong>
        </Text>
        <Button mt={4} onClick={toggleColorMode}>
          Toggle Color Mode
        </Button>
      </Box>
    </Container>
  );
};

export default ThemeTest;
