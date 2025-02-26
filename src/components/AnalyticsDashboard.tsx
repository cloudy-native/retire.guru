import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

// Define data type
interface DataPoint {
  name: string;
  sales: number;
  revenue: number;
  profit: number;
}

// Sample data
const data: DataPoint[] = [
  { name: "Jan", sales: 4000, revenue: 2400, profit: 1200 },
  { name: "Feb", sales: 3000, revenue: 1398, profit: 780 },
  { name: "Mar", sales: 2000, revenue: 9800, profit: 3908 },
  { name: "Apr", sales: 2780, revenue: 3908, profit: 2000 },
  { name: "May", sales: 1890, revenue: 4800, profit: 2300 },
  { name: "Jun", sales: 2390, revenue: 3800, profit: 1700 },
  { name: "Jul", sales: 3490, revenue: 4300, profit: 2100 },
];

// Define custom tooltip props extending Recharts TooltipProps
interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: DataPoint;
    color: string;
  }>;
  label?: string;
}

// Custom tooltip component using Chakra UI
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  if (active && payload && payload.length) {
    return (
      <Box
        p={3}
        bg={bg}
        borderRadius="md"
        boxShadow="md"
        border="1px"
        borderColor={borderColor}
        minWidth="150px"
      >
        <Text fontWeight="bold" mb={2}>
          {label}
        </Text>
        {payload.map((entry, index) => (
          <HStack key={`item-${index}`} mb={1}>
            <Box w="12px" h="12px" borderRadius="sm" bg={entry.color} />
            <Text fontSize="sm">
              {entry.name}: {entry.value.toLocaleString()}
            </Text>
          </HStack>
        ))}
      </Box>
    );
  }
  return null;
};

// Define chart container props
interface ChartContainerProps extends BoxProps {
  title: string;
  children: React.ReactNode;
  height?: number;
}

// Chart container component
const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  height = 300,
  ...boxProps
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      p={4}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      mb={6}
      bg={useColorModeValue("white", "gray.800")}
      shadow="sm"
      {...boxProps}
    >
      <Heading size="md" mb={4}>
        {title}
      </Heading>
      <Box height={`${height}px`} width="100%">
        {children}
      </Box>
    </Box>
  );
};

// Define chart type options
type ChartType = "line" | "bar";

// Main dashboard component
const AnalyticsDashboard: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>("line");
  const theme = useTheme();

  // Colors that work well with Chakra UI
  const colors = {
    sales: theme.colors.blue[500],
    revenue: theme.colors.green[500],
    profit: theme.colors.purple[500],
  };

  // Chakra color mode values
  const gridColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.200");

  // Chart type switcher
  const renderChart = () => {
    if (chartType === "line") {
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="name" tick={{ fill: textColor }} />
          <YAxis tick={{ fill: textColor }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke={colors.sales}
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="revenue" stroke={colors.revenue} />
          <Line type="monotone" dataKey="profit" stroke={colors.profit} />
        </LineChart>
      );
    } else {
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="name" tick={{ fill: textColor }} />
          <YAxis tick={{ fill: textColor }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="sales" fill={colors.sales} />
          <Bar dataKey="revenue" fill={colors.revenue} />
          <Bar dataKey="profit" fill={colors.profit} />
        </BarChart>
      );
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Performance Analytics</Heading>
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button
            onClick={() => setChartType("line")}
            colorScheme={chartType === "line" ? "blue" : "gray"}
          >
            Line
          </Button>
          <Button
            onClick={() => setChartType("bar")}
            colorScheme={chartType === "bar" ? "blue" : "gray"}
          >
            Bar
          </Button>
        </ButtonGroup>
      </Flex>

      <ChartContainer title="Sales, Revenue & Profit Overview" height={400}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </ChartContainer>

      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <ChartContainer title="Monthly Sales" flex={1}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" tick={{ fill: textColor }} />
              <YAxis tick={{ fill: textColor }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="sales" fill={colors.sales} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Monthly Profit" flex={1}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" tick={{ fill: textColor }} />
              <YAxis tick={{ fill: textColor }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="profit" stroke={colors.profit} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Flex>
    </VStack>
  );
};

export default AnalyticsDashboard;
